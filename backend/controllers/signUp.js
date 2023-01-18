const userLoginDetails = require('../models/userLoginDetails');
const colors = require('colors');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {

  let { name, email, password } = req.body;


  bcrypt.hash(password,10).then(hash=>{
    password = hash;
    console.log('my hashed password is -->'.bgCyan,password);
  
    userLoginDetails.create({
      username: name,
      email: email,
      password: password,
    })
    .then((record)=>{
      console.log('New useradded to the database successfully'.green);
    console.log(record);

    res.send('New user added to the database successfully.')
    }).catch(err=>{
      console.log('There\'s an error while creating the user in the database'.red);
      console.log(password);
    console.log(err);

    res.send(`User with the email - ${email} already exists in our database.`);
    })
  }).catch(err=>console.log(err))

};

module.exports = signUp;
