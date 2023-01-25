const colors = require('colors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenValidation = (req,res,next) =>{
const token = req.header('Authorization');

// res.send('oh no');

const userObj = jwt.verify(token,process.env.SECRET);
    
req.userId = userObj.id;

next();

}


module.exports = tokenValidation;