const axios = require('axios').default;

const signInBtn = document.querySelector('.signInBtn');
const cancelBtn = document.querySelector('.cancelbtn');
const signUpBtn = document.querySelector('.signupbtn')

const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('.username-login').value.trim();
    const password = document.querySelector('.password-login').value.trim();
    if (username && password) {
        const response = await axios({
            method: 'post',
            url: '/api/user/login',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.statusText === 'ok') {
            document.location.replace('/profile');
        } else {
            alert(response.statusText)
        }
    }
}

const signupFormHandler = async (event) => {
    event.preventDefault();
    const newUsername = document.querySelector('#new-username').value.trim();
    const newUserEmail = document.querySelector('#new-userEmail').value.trim();
    const newUserPassword = document.querySelector('#new-userPass').value.trim();
    const repeatedPassword = document.querySelector('#password-repeat').value.trim();

    if(!newUserPassword === repeatedPassword) {
        alert('Passwords do not match please try again');
        newUserPassword = '';
        newUserEmail = '';
        newUsername = '';
        repeatedPassword = '';
    } else if ( newUsername && newUserEmail && newUserPassword) {
        const response = await axios({
            method: 'post',
            url: '/api/user/add',
            body: JSON.stringify({ newUsername, newUserPassword, newUserEmail }),
            headers: { 'Content-Type': 'application/json' },
        });
         if (response.statusText === 'ok') {
             document.location.replace('/profile');
         } else {
             alert(response.statusText);
         }
    }
}


signInBtn.addEventListener('submit', loginFormHandler);
signUpBtn.addEventListener('submit', signupFormHandler);