const sequelize = require('../util/database');
const Sequelize = require('sequelize');
const expense = require('../models/expense');

const userLoginDetails = sequelize.define('userLoginDetails',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

userLoginDetails.hasMany(expense);
expense.belongsTo(userLoginDetails);

sequelize.sync({force : false})
.then((res)=>{
    console.log('userLoginDetails table synced successfully --> (2)'.blue)
    console.log(res);
})
.catch(err=>{
    console.log('There\'s an error while syncing the userLoginDetails table'.red)
    console.log(err);
});

module.exports = userLoginDetails;
