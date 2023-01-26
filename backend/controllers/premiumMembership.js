const RazorPay = require('razorpay');
const colors = require('colors');
const orders = require('../models/orders');
const userLoginDetails = require('../models/userLoginDetails');
require('dotenv').config();

const premiumMembership = (req, res) => {
  const userId = req.userId;

  console.log(
    '---------------------------------------------->>>>>>>>>>>>'.bgGreen
  );
  console.log(userId);

  let instance = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    "amount": "2500", // amount in the smallest currency unit
    "currency": 'INR',
    "receipt": 'order_rcptid_12',
  };
  instance.orders.create(options, (err, order) => {
    if(err){
      console.log(err);
      res.json('There\'s an error while creating the order')
    }
    console.log(order);
    console.log('-----------------------> orders'.bgGreen);

    orders
      .create({
        orderId: order.id,
        status: 'Pending',
        userLoginDetails: userId,
        paymentId: 'Pending',
      })
      .then((result) => {
        let recordId = result.id;
        console.log('User order successfully saved on db.'.green, result);
        console.log('The record id is ----------->'.green,recordId);
        return res
          .json({ order, key_id: process.env.RAZORPAY_KEY_ID, recordId : recordId });
      })
      .catch((err) => {
        console.log("There's an error while storing the user order in db.".red, err);
      });


  });
};

module.exports = premiumMembership;
