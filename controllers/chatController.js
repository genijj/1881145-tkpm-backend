const chatService = require('../services/chatService');

const chat = async (req, res) => {
  try {
    const responseMessage = await chatService.chat(req.userId, req.body.message);
    res.json({ message: responseMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await chatService.getChatHistory(req.userId);
    res.json({ chatHistory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    await chatService.clearChatHistory(req.userId);
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  chat,
  clearChatHistory, 
  getChatHistory
};


