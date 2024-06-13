const ttsService = require('../services/ttsService');
const path = require('path');

const textToSpeech = async (req, res) => {
  try {
    const audioFilename = await ttsService.textToSpeech(req.body.text);
    const audioUrl = `${req.protocol}://${req.get('host')}/uploads/${audioFilename}`;
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error in text-to-speech controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  textToSpeech
};
