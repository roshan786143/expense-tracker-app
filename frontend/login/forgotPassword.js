
const forgotPassword = (event) =>{
    event.preventDefault();
    let email = document.getElementById('email');
    const form = document.getElementById('form');

    email = email.value;

    console.log(email);

    axios.post('http://127.0.0.1:3000/user/forgotPassword',{email})
    .then(response=>{
        console.log(response);

        // const heading = document.getElementById('heading');
        // form.style.display = "none";
        let resetPasswordLink = document.createElement('a');
        // resetPasswordLink.href = response.data;
        resetPasswordLink.href = "./enterNewPassword.html";
        form.appendChild(resetPasswordLink);
        console.log(response.data);

        localStorage.setItem('user_id',response.data);



        resetPasswordLink.style.color = 'green';
        resetPasswordLink.innerHTML = 'Reset password';
        // heading.appendChild(resetPasswordLink);

        // window.location.href = "./enterNewPassword.html";
    })
    .catch(err=>{
        console.log(err);
    })
}