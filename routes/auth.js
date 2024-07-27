const express = require('express');
const auth = require('../controllers/auth');

const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/forget-password', auth.forgetPassword);
router.post('/reset-password/:resetToken', auth.resetPassword);
module.exports = router;