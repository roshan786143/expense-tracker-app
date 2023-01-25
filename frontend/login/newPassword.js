
const userUpdatedPassword = (event) =>{
    event.preventDefault();
    // console.log('new password updated in to our db successfully.');

    let password = document.getElementById('password');

    password = password.value;

    const user_id = localStorage.getItem('user_id');

    // console.log(password);
    axios.post('http://127.0.0.1:3000/password/updatePassword',{password, id : user_id})
    .then(response=>{
        console.log(response);

        const form = document.getElementById('form');

        form.style.display = "none";

        const heading = document.getElementById('heading');

        heading.style.display = "none";

        const body = document.getElementById('body');

        const msg = document.createElement('h2');

        msg.style.color = 'hotpink';

        msg.innerHTML = 'hurray,password changed successfully :)';

        body.appendChild(msg);

    })
    .catch(err=>{
        console.log(err);
    })
}