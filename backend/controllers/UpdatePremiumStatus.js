const orders = require('../models/orders');
const colors = require('colors');
const tokenValidation = require('./tokenValidation');

const updatePremiumStatus = (req,res)=>{

    const {order_id, payment_id,status} = req.body;
    const userId = req.userId;
    
    orders.update({
        orderId : order_id,
        paymentId : payment_id,
        status : status,
        userLoginDetailId : userId
})
.then(record=>{
    console.log('User Premium status updated in our db successfully'.bgGreen);
    console.log(record);
})
.catch(err=>{
    console.log('There\'s an error while updating premium status of the user in db'.bgRed)
    console.log(err);
})
}

module.exports = updatePremiumStatus;