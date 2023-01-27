const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');

    signupBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    
    let name = document.getElementById('firstName');
    let email = document.getElementById('email');
    let mobileNumber = document.getElementById('mobileNumber');
    let password = document.getElementById('password');

    name = name.value;
    email = email.value;
    mobileNumber = mobileNumber.value;
    password = password.value;

    const userDetails = {
        name,
        email,
        mobileNumber,
        password
    }

    console.log(userDetails);

    postingUserDetails(userDetails);

});

const postingUserDetails = (userDetails) =>{
    axios.post('http://127.0.0.1:3000/user/signup',userDetails)
    .then(response=>{
        console.log('user details successfully stored in db.')
        alert(response.data);
        console.log(response)
    }).catch(err=>{
        console.log('There\'s an error while sending your details to backend.')
        console.log(err);
    })
}


loginBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  window.location.href = '/frontend/login/loginPage1.html';
})
