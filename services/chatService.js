const OpenAI = require('openai');
const { ChatHistory } = require('../models');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

const chat = async (userId, message) => {
  try {
    const chatHistory = await ChatHistory.findAll({ where: { userId } });
    const messages = chatHistory.map(chat => ({
      role: chat.role,
      content: chat.content,
    }));

    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages,
    });

    const responseMessage = completion.choices[0].message.content;

    await ChatHistory.create({ role: 'user', content: message, userId });
    await ChatHistory.create({ role: 'assistant', content: responseMessage, userId });

    return responseMessage;
  } catch (error) {
    console.error('Error in chat service:', error);
    throw new Error('Chat service failed');
  }
};

const getChatHistory = async (userId) => {
  try {
    const chatHistory = await ChatHistory.findAll({ where: { userId }, order: [['createdAt', 'ASC']] });
    return chatHistory.map(chat => ({
      role: chat.role,
      content: chat.content,
      createdAt: chat.createdAt
    }));
  } catch (error) {
    console.error('Error in getting chat history:', error);
    throw new Error('Failed to get chat history');
  }
};

const clearChatHistory = async (userId) => {
  await ChatHistory.destroy({ where: { userId } });
};

module.exports = {
  chat,
  clearChatHistory, 
  getChatHistory,
};

