const orders = require('../models/orders');
const colors = require('colors');
const tokenValidation = require('./tokenValidation');
const userLoginDetails = require('../models/userLoginDetails');

const updatePremiumStatus = (req,res)=>{

    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;

    console.log('The status body -------------------->'.bgGreen);
    console.log(req.body);

    const userId = req.userId;

    orders.findOne({
        where : {
            orderId : razorpay_order_id
        }
    }).then(record=>{
    
    record.update({
        orderId : razorpay_order_id,
        paymentId : razorpay_payment_id,
        status : 'Success',
        userLoginDetailId : userId
})
.then(record=>{
    console.log('User Premium status updated in our db successfully'.bgGreen);
    console.log(record);

    userLoginDetails.findOne({
        where : {
            id : userId
        }
    }).then(record=>{
        record.update({
            isPremiumUser : true
        })
        .then(result=>console.log('user premium status record updated successfully'.bgGreen))
        .catch(err=>console.log('There\'s an error while updating the user record'.bgRed))
    })
})
.catch(err=>{
    console.log('There\'s an error while updating premium status of the user in db'.bgRed)
    console.log(err);
})
    })
}

module.exports = updatePremiumStatus;