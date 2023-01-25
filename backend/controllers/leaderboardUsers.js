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
        // console.log(userNames);

        for(let i = 0;i < userids.length;i++){

        expense.findAll({
            where : {
                userLoginDetailId : userids[i]
            }
        })
        .then(records=>{
            // console.log(records);
            const amounts = records.map(record => record.dataValues.amount);
            // console.log(amounts);

            const totalUserExpenseAmount = amounts.reduce((accum,curr)=>accum + curr);

            userObjs.push({name : userNames[i], expenseAmount : totalUserExpenseAmount})

            if(userids.length-1 === i){
               console.log(userObjs);
               return res.json(userObjs);
            }
        })
        .catch(err=>{
            console.log(err);
        })

        console.log(userObjs);
    }
    })

}
module.exports = leaderboardUsers;