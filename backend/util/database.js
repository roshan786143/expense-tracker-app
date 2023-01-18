const Sequelize = require('sequelize');
const colors = require('colors');

const sequelize = new Sequelize('expenseTracker','root','98127634$Sql',{
    host : 'localhost',
    dialect : 'mysql'
})

sequelize.authenticate()
.then(()=>console.log('connection to the database established successfully --> (1)'.green))
.catch(err=>{
    console.log('There\'s an error while connecting to the database.'.red);
    console.log(err)
})

module.exports = sequelize;