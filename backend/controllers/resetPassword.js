const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const resetPssword = (req,res) =>{
    const userEmail = req.body;
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
    console.log('Email sent')
    console.log(userEmail);
    res.json('Email sent successfully')
  })
  .catch((error) => {
    console.error(error)
    res.json('There\'s an error while sending the email')
  })
}

module.exports = resetPssword;