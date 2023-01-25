const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const colors = require('colors');
const userLoginDetails = require('./userLoginDetails');

const forgetPasswords = sequelize.define('forgetPasswords',{
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    passwordId : {
        type : DataTypes.STRING,
        allowNull : true
    },
    userId : {
        type : DataTypes.INTEGER
    },
    isActive : {
        type : DataTypes.BOOLEAN
    }
})

userLoginDetails.hasMany(forgetPasswords);
forgetPasswords.belongsTo(userLoginDetails);

sequelize.sync({force : false})
.then(res=>{
    console.log('forgetPasswords table synced successfully'.green);
    console.log(res);
})
.catch(err=>{
    console.log('There\'s an error while syncing the forgetPasswords table'.red);
    console.log(err);
})

module.exports = forgetPasswords;