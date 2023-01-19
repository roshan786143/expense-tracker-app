const expense = require('../models/expense');

const addExpense = (req,res)=>{
    const {amount,description,category} = req.body;
    expense.create({
        amount : amount,
        description : description,
        category : category
    })
    .then((record)=>{
        console.log('data updated successfully.')
        res.send(record);
})
    .catch(err=>{
        console.log(err)
        res.send('there\'s an error while storing the data on the db.')
})

}

module.exports = addExpense;