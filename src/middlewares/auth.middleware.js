const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const blacklist = require('../config/blacklist.store');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: 'Authorization header required' });

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer')
      return res.status(401).json({ message: 'Invalid Authorization header format' });

    const token = tokenParts[1];

    if (blacklist.has(token))
      return res.status(401).json({ message: 'Token has been revoked' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ fix: payload.userId → user._id
    const user = await User.findById(payload.userId).select('-passwordHash');
    if (!user)
      return res.status(401).json({ message: 'Invalid token user' });

    // ✅ Attach real Mongo user document
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
