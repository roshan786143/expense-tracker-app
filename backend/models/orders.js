const sequelize = require('../util/database');
const { Sequelize,DataTypes } = require('sequelize');

const orders = sequelize.define('orders',{
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    orderId : {
        type : DataTypes.STRING,
        allowNull : false 
    },
    paymentId : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

sequelize.sync({force : false})
.then(res=>{
    console.log('orders table has been created successfully.'.bgGreen)
    console.log(res);
})
.catch(err=>{
    console.log('There\'s an error while creating the table.'.bgRed);
    console.log(err);
})

module.exports = orders;