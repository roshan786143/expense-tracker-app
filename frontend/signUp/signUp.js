const signUp = async (event) => {
  event.preventDefault();
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let form = document.getElementById('form');

  const newUserSignup = document.createElement('h3');

  //extracting the form field values

  name = name.value;
  email = email.value;
  password = password.value;

  const signUpData = {
    name,
    email,
    password,
  };

  console.log('my name is -->', name);

  try {
    const response = await axios.post(
      'http://localhost:3000/user/signup',
      signUpData
    );

    newUserSignup.innerHTML = response.data;
    form.appendChild(newUserSignup);

    console.log('got the data from server');
    console.log(response.data);
  } catch (err) {
    console.log(err);
    newUserSignup.innerHTML = err;
    form.appendChild(newUserSignup);
  }
};
