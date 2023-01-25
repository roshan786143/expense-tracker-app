
const forgotPassword = (event) =>{
    event.preventDefault();
    let email = document.getElementById('email');

    email = email.value;

    // console.log(email);

    axios.post('http://127.0.0.1:3000/user/forgotPassword',{email})
    .then(response=>{
        console.log(response);
    })
    .catch(err=>{
        console.log(err);
    })
}