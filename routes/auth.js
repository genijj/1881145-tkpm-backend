const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update-user-info', authMiddleware, authController.updateUserInfo);
router.get('/get-user-info', authMiddleware, authController.getUserInfo);
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
