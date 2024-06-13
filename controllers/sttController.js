const multer = require('multer');
const upload = multer();
const fs = require('fs');
const path = require('path');

const sttService = require('../services/sttService');

const speechToText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    console.log('Uploaded file size:', req.file.size, 'bytes');
    console.log('Uploaded file original name:', req.file.originalname);

    const tempFilePath = path.join(__dirname, 'temp.wav');
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const transcript = await sttService.speechToText(req.file.buffer);

    fs.unlinkSync(tempFilePath);

    res.json({ transcript });
  } catch (error) {
    console.error('Error in speech-to-text controller:', error.message);
    res.status(500).json({ message: 'Failed to convert speech to text' });
  }
};

module.exports = {
  speechToText,
  upload
};
