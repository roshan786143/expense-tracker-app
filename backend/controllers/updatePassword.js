const bcrypt = require('bcrypt');
const userLoginDetails = require('../models/userLoginDetails');
const forgetPasswords = require('../models/forgetPasswords');

const updateUserPassword = (req,res) =>{

    const newPassword = req.body.password;

    const id = req.body.id;

    bcrypt.hash(newPassword,10).then(newhashedPassword=>{
        console.log(newhashedPassword);

        forgetPasswords.findOne({
            where : {
                passwordId : id
            }
        })
        .then(record=>{
            const user_id = record.dataValues.userId;
            console.log(user_id);

            record.update({
                isActive : true
            }).then(()=>{
                userLoginDetails.findOne({
                    where : {
                        id : user_id
                    }
                }).then(record=>{
                    record.update({
                        password : newhashedPassword
                    }).then((record)=>{
                        console.log('success');
                        console.log(record);
                        res.json('success');
                    }).catch(err=>{
                        res.json('failure')
                        console.log(err);
                    })
                })
            })
        })
    }).catch(err=>{
        console.log('There\'s an error while hashing the password');
        console.log(err);
        res.json('There\'s an error while hashing the password');
    })

}

module.exports = updateUserPassword;

// '$2b$10$YsrIOJVoCyd.5C8ky1a5m.O4.j2mVZo.w//pWUJ7SD2ou91lRQqvG'

// $2b$10$eebFCy0DoeLAkjGRAvKo6uzL.B5.TLLvx4Bu7tfjaQBTLWMcTq7WG