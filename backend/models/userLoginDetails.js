const sequelize = require('../util/database');
const Sequelize = require('sequelize');

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

sequelize.sync()
.then(()=>console.log('userLoginDetails table synced successfully --> (2)'.blue))
.catch(err=>console.log('There\'s an error while syncing the userLoginDetails table'.red));

module.exports = userLoginDetails;