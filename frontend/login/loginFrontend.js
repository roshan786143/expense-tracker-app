
const userLoginData = (event) => {
  event.preventDefault();
  let email = document.getElementById('email');
  let password = document.getElementById('password');

  email = email.value;
  password = password.value;

  const loginDetails = {
    email,
    password,
  };

  postingUserLoginCredentials(loginDetails);

}

const postingUserLoginCredentials = async(loginDetails) =>{
  let form = document.getElementById('form');
  let showUserLoginStatus = document.createElement('h3');
  try {
    const response = await axios.post(
      'http://127.0.0.1:3000/user/login',
      loginDetails
    );

    if(response.data == ''){
      showUserLoginStatus.innerHTML = 'Pls.fill your login details';
      form.appendChild(showUserLoginStatus);
      return
    }

    if (response.data == 'notAValidPassword') {
      showUserLoginStatus.innerHTML = 'User Exist but password do not match';
      form.appendChild(showUserLoginStatus);
      return
    }

    if(response.data == 'notAValidUser'){
      showUserLoginStatus.innerHTML = `User with the email (${loginDetails.email}) not found, Pls.create an account`;
      form.appendChild(showUserLoginStatus);
      return
    }

    if(response.data.loginStatus == 'success'){
      
      localStorage.removeItem('userToken');
      localStorage.setItem('userToken',response.data.token);

      showUserLoginStatus.innerHTML = 'login successful';
      form.appendChild(showUserLoginStatus);
      
      let displayNum = document.createElement('h3');
      let count = 3;
      
      setInterval(() => {
        displayNum.innerHTML = count;
        showUserLoginStatus.appendChild(displayNum);
        count--;
        console.log(count);
      }, 1000);
      setTimeout(() => {
        window.location.href = '../expenses/expensePage.html';
      }, 3600);
    } 
  } catch (err) {
    console.log('There\'s an error while posting the user login credentials');
    // console.log(loginDetails);
    console.log(err);

}
}
