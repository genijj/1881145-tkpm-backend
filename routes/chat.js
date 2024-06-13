const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, chatController.chat);
router.get('/get-history', authMiddleware, chatController.getChatHistory);
router.delete('/clear-history', authMiddleware, chatController.clearChatHistory);

module.exports = router;
