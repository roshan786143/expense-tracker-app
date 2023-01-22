const expense = require('../models/expense');
const tokenValidation = require('./tokenValidation');

const getExpenses = (req,res) =>{
    expense.findAll()
        .then(records=>{
            let recordsData = records.map(everyRecord=>everyRecord);
            // console.log(recordsData);
            // const token = req.headers['Authorization'];
            // res.json(token);
            res.json(recordsData);
})


}

module.exports = getExpenses;