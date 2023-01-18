const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signUp');
const login = require('../controllers/login');

router.post('/user/signup',signUp);

router.post('/user/login',login);

module.exports = router;