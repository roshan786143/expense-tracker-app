const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click',(event)=>{
    event.preventDefault();
  
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
  
    email = email.value;
    password = password.value;
  
    const loginCredentials = {
      email,
      password,
    };
  
    console.log(loginCredentials);
  
    postingLoginDetails(loginCredentials);
  });
  
  const postingLoginDetails = (loginCredentials) => {
    let displayUserLoginStatus = document.createElement('h3');
    let form = document.getElementById('form');
    axios
      .post('http://127.0.0.1:3000/user/login', loginCredentials)
      .then(response => {
        console.log('user login credentials posted successfully');
        console.log('user token ------------------------------>');
        console.log(response);
  
        if(response.data === ''){
        //   displayUserLoginStatus.innerHTML = 'Pls.fill your login details properly';
          alert('Pls.fill your login details properly');
        //   form.appendChild(displayUserLoginStatus);
          return
        }
        if(response.data === 'notAValidPassword'){
        //   displayUserLoginStatus.innerHTML = 'User exists but password do not match';
             alert('User exists but password do not match');
        //   form.appendChild(displayUserLoginStatus);
          return
        }
        if(response.data.loginStatus === 'success'){
            localStorage.removeItem('userToken');
            alert('login successful');
            localStorage.setItem('userToken',response.data.token);
            window.location.href = '../expenses/expensePage.html'; 
          return
        }
        if(response.data === 'notAValidUser'){
          console.log("There's an error while posting the user login details");
          alert(`User with the email - (${loginCredentials.email}) doesn\'t exist..,Pls.create an account`);
        //   form.appendChild(displayUserLoginStatus)
          return
      }
    })
    .catch(err => {
      console.log('There\'s an error while posting your login credentials to backend');
      console.log(err);
      });
  };
  
  const goToSignUpPage = () => {
    // event.preventDefault();
    window.location.href = '../signUp/signUpPage.html';
  };
  