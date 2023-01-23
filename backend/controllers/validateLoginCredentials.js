const userLoginDetails = require('../models/userLoginDetails');
const colors = require('colors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateLoginCredentials = (req, res) => {
  const { email, password } = req.body;

  if (email.length === 0) {
    res.send(null);
    return;
  }

  userLoginDetails
    .findOne({
      where: {
        email: email,
      },
    })
    .then((record) => {
      bcrypt
        .compare(password, record.dataValues.password)
        .then((isValidPassword) => {
          
          if (isValidPassword) {
            const {id, username, email} = record;

            const jwtPayload = {
              id,
              username,
              email
            }

           const jwtToken = jwt.sign(jwtPayload,process.env.SECRET);
           
            res.json({token : jwtToken, loginStatus : 'success'});
          } else {
            res.send('notAValidPassword');
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(`notAValidUser`);
    });
};

module.exports = validateLoginCredentials;
