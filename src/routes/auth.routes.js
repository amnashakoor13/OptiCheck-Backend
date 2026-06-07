const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

const router = express.Router();

// 📝 SIGNUP
router.post(
  '/signup',
  [
    body('username').isLength({ min: 3 }).withMessage('username min 3 chars'),
    body('password').isLength({ min: 8 }).withMessage('password min 8 chars'),
  ],
  controller.signup
);

// 🔐 LOGIN
router.post(
  '/login',
  [
    body('usernameOrEmail').notEmpty().withMessage('usernameOrEmail required'),
    body('password').notEmpty().withMessage('password required'),
  ],
  controller.login
);

// 🚪 LOGOUT
router.post('/logout', authMiddleware, controller.logout);

// 👤 GET CURRENT USER
router.get('/me', authMiddleware, controller.me);

// 🗑️ DELETE CURRENT USER
router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
