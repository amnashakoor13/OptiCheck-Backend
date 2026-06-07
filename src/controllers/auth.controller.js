const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const blacklist = require('../config/blacklist.store');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ message: 'User already exists (username/email)' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ id: user._id, username: user.username, createdAt: user.createdAt });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    // Add token to blacklist for remaining TTL
    const token = req.token;
    const payload = jwt.decode(token);
    const exp = payload.exp || 0;
    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(0, exp - now);
    if (ttl > 0) blacklist.add(token, ttl);
    // front-end should also clear localStorage/session storage
    res.json({ message: 'Logged out' });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) { next(err); }
};
