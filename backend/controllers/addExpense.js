const expense = require('../models/expense');

const addExpense = (req,res)=>{
    const {amount,description,category} = req.body;
    expense.create({
        amount : amount,
        description : description,
        category : category
    })
    .then(()=>{
        console.log('data updated successfully.')
        expense.findAll()
        .then(records=>{
            let recordsData = records.map(everyRecord=>everyRecord);
            console.log(recordsData);
            res.send(recordsData);
    })
        .catch(err=>console.log(err))

})
    .catch(err=>{
        console.log(err)
        res.send('there\'s an error while storing the data on the db.')
})

}

module.exports = addExpense;