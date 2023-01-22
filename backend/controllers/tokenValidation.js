const colors = require('colors');

const tokenValidation = (req,res) =>{

    const token = req.header('Authorization');
    
    console.log('--------------------------'.bgRed);
    console.log(token);
    
    
    res.json(token);
    // next();
}


module.exports = tokenValidation;