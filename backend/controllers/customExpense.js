const expense = require('../models/expense');
const userLoginDetails = require('../models/userLoginDetails');
const customExpense = (req,res)=>{
    const userid = req.userId;

    const expenseNum = req.params.num;

    // console.log(expenseNum);

    const customExpenseNum = parseInt(expenseNum);

    expense.findAll({
        where : {
            userLoginDetailId : userid,
        },
        limit : customExpenseNum,
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

module.exports = customExpense;