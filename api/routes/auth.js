const express = require('express');
const {
  login,
  register,
  profile
} = require('../controller/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, profile);

module.exports = router;