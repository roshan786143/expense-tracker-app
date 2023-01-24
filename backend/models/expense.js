const  Sequelize  = require('sequelize');
const sequelize = require('../util/database');
const colors = require('colors');

const expense = sequelize.define('expense',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    amount : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    description : {
        type : Sequelize.STRING,
        allowNull : false
    },
    category : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

sequelize.sync({force : false})
.then(()=>console.log('expense table synced successfully --> (3)'.yellow))
.catch(err=>console.log(err))

module.exports = expense;