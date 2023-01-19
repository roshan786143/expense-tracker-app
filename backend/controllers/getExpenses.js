const expense = require('../models/expense');

const getExpenses = (req,res) =>{
    expense.findAll()
        .then(records=>{
            let recordsData = records.map(everyRecord=>everyRecord);
            console.log(recordsData);
            res.send(recordsData);
})
}

module.exports = getExpenses;