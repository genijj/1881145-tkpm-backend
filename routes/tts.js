const express = require('express');
const router = express.Router();
const ttsController = require('../controllers/ttsController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, ttsController.textToSpeech);

module.exports = router;
