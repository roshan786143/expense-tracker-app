const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signUp');
const login = require('../controllers/login');
const addExpense = require('../controllers/addExpense');

router.post('/user/signup',signUp);

router.post('/user/login',login);

router.post('/expense/addexpense',addExpense);

module.exports = router;