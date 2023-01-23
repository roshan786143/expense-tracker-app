const expense = require('../models/expense');
const userLoginDetails = require('../models/userLoginDetails');
const sequelize = require('../util/database');
const tokenValidation = require('./tokenValidation');

const getExpenses = (req, res) => {

    const userid = req.userId;

    console.log('----------------------->>>user'.bgCyan);
    console.log(userid);


    expense.findAll({
        where : {
            userLoginDetailId : userid
        }
    })
    .then(expenses=>{
        res.json(expenses)
    })
    .catch(err=>{

    console.log('There\'s an error while fetching the user expenses');

    console.log(err);

    res.json(err)

    })
};

module.exports = getExpenses;
