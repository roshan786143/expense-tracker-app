const sgMail = require('@sendgrid/mail')
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const forgetPasswords = require('../models/forgetPasswords');
const userLoginDetails = require('../models/userLoginDetails');

const resetPssword = (req,res) =>{
    const userEmail = req.body;
    // console.log(userEmail);
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: userEmail.email, // Change to your recipient
  from: 'roshanbabu.kng1@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {

    console.log('the email ----------->'.bgRed);
    console.log(userEmail.email);
    // console.log('Email sent')
    // console.log(userEmail);
    // res.json()

    userLoginDetails.findAll({
      where : {
        email : userEmail.email
      }
    })
    .then(record=>{
      console.log(record[0].dataValues.id);
      console.log(record);

      const userId = record[0].dataValues.id;

      const uId = uuidv4();

      forgetPasswords.create({
        passwordId : uId,
        userId : userId,
        isActive : false,
        userLoginDetailId : userId
      }).then(()=>{
        console.log('Successfully sent the password reset link.');
        res.json(uId);
      }).catch(err=>{
        console.log('There\'s an error while sending reset password link');
        console.log(err);
      })
      // res.json(record);
    })



  })
  .catch((error) => {
    console.error(error)
    res.json('There\'s an error while sending the email')
  })
}

module.exports = resetPssword;