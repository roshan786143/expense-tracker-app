const userLoginDetails = require('../models/userLoginDetails');
const colors = require('colors');
const bcrypt = require('bcrypt');

const login = (req,res)=>{
    const {email,password} = req.body;

    if(email.length === 0){
        res.send('Pls.fill your details properly.')
        return
    }

    userLoginDetails.findOne({
        where : {
            email : email
        }
    })
    .then(record=>{
            bcrypt.compare(password,record.dataValues.password)
            .then(passwordCheck=>{
            console.log('my normal password is -->'.blue,password);
            console.log('my hashed password is -->'.bgGreen,record.dataValues.password);
            console.log('password verifying -->'.bgCyan,passwordCheck);
            if(passwordCheck){
                res.send(`hi ${record.dataValues.username} Welcome back to your account`);
            }else{
            res.send(`User exist but password do not match.`);
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(`User with the email doesn\'t exist.`);
    })
}

module.exports = login;