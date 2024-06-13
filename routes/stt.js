const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const sttController = require('../controllers/sttController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, sttController.upload.single('audio'), (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }
    next();
  }, sttController.speechToText);

module.exports = router;
