const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signUp');

router.post('/user/signup',signUp);

module.exports = router;