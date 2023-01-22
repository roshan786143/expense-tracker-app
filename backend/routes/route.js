const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signUp');
const validateLoginCredentials = require('../controllers/validateLoginCredentials');
const addExpense = require('../controllers/addExpense');
const getExpenses = require('../controllers/getExpenses');
const deleteExpense = require('../controllers/deleteExpense');

const tokenValidation = require('../controllers/tokenValidation');

router.post('/user/signup',signUp);

router.post('/user/login',validateLoginCredentials);

// router.post('/expense/tokenValidation',tokenValidation);

router.get('/expense/getexpenses',tokenValidation,getExpenses);

router.delete('/expense/delete-expense/:id',deleteExpense);

router.post('/expense/addexpense',addExpense);

module.exports = router;