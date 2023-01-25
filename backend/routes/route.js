const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signUp');
const validateLoginCredentials = require('../controllers/validateLoginCredentials');
const addExpense = require('../controllers/addExpense');
const getExpenses = require('../controllers/getExpenses');
const deleteExpense = require('../controllers/deleteExpense');
const tokenValidation = require('../controllers/tokenValidation');
const premiumMembership = require('../controllers/premiumMembership');
const updatePremiumStatus = require('../controllers/UpdatePremiumStatus');
const leaderboardUsers = require('../controllers/leaderboardUsers');

router.post('/user/signup',signUp);

router.post('/user/login',validateLoginCredentials);

router.get('/expense/getexpenses',tokenValidation,getExpenses);

router.delete('/expense/delete-expense/:id',deleteExpense);

router.post('/expense/addexpense',tokenValidation,addExpense);

router.get('/purchase/premiumMembership',tokenValidation,premiumMembership);

router.post('/purchase/updatePremiumStatus',tokenValidation,updatePremiumStatus);

router.get('/user/leaderboardUsers',tokenValidation,leaderboardUsers);

module.exports = router;