const userLoginDetails = require('../models/userLoginDetails');
const colors = require('colors');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userAdded = await userLoginDetails.create({
      username: name,
      email: email,
      password: password,
    });

    console.log('New useradded to the database successfully'.green);
    console.log(userAdded);

    res.send('New user added to the database successfully.');

  } catch (err) {

    console.log('There\'s an error while creating the user in the database'.red);
    console.log(err);

    res.send(`User with the email - ${email} already exists in our database.`);
  }
};

module.exports = signUp;
