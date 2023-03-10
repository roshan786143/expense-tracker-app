const expense = require('../models/expense');
const userLoginDetails = require('../models/userLoginDetails');
const sequelize = require('../util/database');
const tokenValidation = require('./tokenValidation');

const getExpenses = (req, res) => {

    const userid = req.userId;

    // const page = req.params.pageNumber;
    // console.log('pageNumber -------------------------->>>>'.bgGreen);
    // let pageNumber = parseInt(page);
    // console.log('The page number ---->>>'.bgBlue);
    // console.log(pageNumber);

    console.log('----------------------->>>user'.bgCyan);
    console.log(userid);


    expense.findAll({
        where : {
            userLoginDetailId : userid,
        },
        // limit : pageNumber,
        // offset : 1
    })
    .then(expenses=>{
        // for finding the status of premium user
        userLoginDetails.findOne({
            where : {
                id : userid
            }
        })
        .then(record=>{
            console.log('The records that corresponds to page number are ---->'.bgGreen);
            // console.log(record);
            res.json({expenses,userStatus : record.isPremiumUser})
        }).catch(err=>console.log('There\'s an error while fetching the record.'))
    })
    .catch(err=>{

    console.log('There\'s an error while fetching the user expenses');

    console.log(err);

    res.json(err)

    })
};

module.exports = getExpenses;
