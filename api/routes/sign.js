const express = require('express');
const { protect } = require('../middleware/auth');
const { exeSendSubstrate } = require('../controller/sign');

const router = express.Router();

router.post('/', protect, exeSendSubstrate);

module.exports = router;