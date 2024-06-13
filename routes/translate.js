const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translateController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, translateController.translate);

module.exports = router;
