const express = require('express');
const { protect } = require('../middleware/auth');
const { getSigned } = require('../controller/sign');

const router = express.Router();

router.post('/', protect, getSigned);

module.exports = router;