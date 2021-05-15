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
        }else {
            alert (response.statusText)
        }
    }
}

