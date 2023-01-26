const expense = require('../models/expense');
const userLoginDetails = require('../models/userLoginDetails');
const getExpensesPerPage = (req,res) =>{
    const userid = req.userId;
    const page = req.params.page;

    const pageNumber = parseInt(page);
    console.log('The page No ---->');
    console.log(page);
    console.log(userid);

    expense.findAll({
        where : {
            userLoginDetailId : userid,
        },
        limit : 10,
        offset : pageNumber
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

module.exports = getExpensesPerPage;