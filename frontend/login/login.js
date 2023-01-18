
const login = async(event) =>{
    event.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let form = document.getElementById('form');
    let showUserLoginStatus = document.createElement('h3');

    email = email.value;
    password = password.value;

    const loginDetails = {
        email,
        password
    }

    try{
    const response = await axios.post('http://127.0.0.1:3000/user/login',loginDetails);
    console.log(response.data);
    showUserLoginStatus.innerHTML = response.data;
    form.appendChild(showUserLoginStatus);
}catch(err){
console.log(err);
showUserLoginStatus.innerHTML = err.data;
form.appendChild(showUserLoginStatus);
}

}