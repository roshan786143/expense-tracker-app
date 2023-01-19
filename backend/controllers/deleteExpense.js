const expense = require('../models/expense');
const colors = require('colors');

const deleteExpense = (req,res)=>{

    const requestedId = req.params.id;

    console.log(requestedId);

    expense.destroy({
        where : {
            id : requestedId
        }
    })
    .then(result=>{
        console.log('your expense record deleted successfully from the database.'.bgGreen);
        res.send('your expense record deleted successfully from the db.');
        console.log(result)
    })
    .catch(err=>{
        console.log('There\'s an error while deleting the record from the db'.bgRed);
        res.send('There\'s an error while deleting the record from the db');
        console.log(err)
    })

}

module.exports = deleteExpense;