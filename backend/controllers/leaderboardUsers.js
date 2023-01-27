const tokenValidation = require('./tokenValidation');
const userLoginDetails = require('../models/userLoginDetails');
const expense = require('../models/expense');
const colors = require('colors');

const leaderboardUsers = (req,res) =>{

    let userObjs = [];

    userLoginDetails.findAll()
    .then(records=>{
        userNames = records.map(record=>record.dataValues.username);
        userids = records.map(record=>record.dataValues.id);
        console.log(userids);
        console.log(userNames);

        for(let i = 0;i < userids.length;i++){

        expense.findAll({
            where : {
                userLoginDetailId : userids[i]
            }
        })
        .then(records=>{
            // console.log('------------------------------------------->'.bgRed);
            // console.log(records);
            const amounts = records.map(record => record.dataValues.amount);
            // console.log(amounts);

            let userTotalAmount = 0;
            for(let i = 0;i < amounts.length;i++){
                userTotalAmount += amounts[i];
            }

            userObjs.push({name : userNames[i], expenseAmount : userTotalAmount})

            if(i===userids.length-1){
                console.log('---------------------------------'.bgGreen);
                res.json(userObjs);
                return;

            }

        })
        .catch(err=>{
            console.log(err);
            // res.json(err);
        })
    }
    })

}
module.exports = leaderboardUsers;