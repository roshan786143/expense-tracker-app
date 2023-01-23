const expense = require('../models/expense');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addExpense = (req,res)=>{
    const {amount,description,category} = req.body;

    console.log('...............................>>>'.bgYellow);
    const userId = req.userId;
    
    expense.create({
        amount : amount,
        description : description,
        category : category,
        userLoginDetailId : userId
    })
    .then((record)=>{
        console.log('data updated successfully.')
        res.send(record);
})
    .catch(err=>{
        console.log(err)
        res.send('there\'s an error while storing the data on the db.')
})}

module.exports = addExpense;