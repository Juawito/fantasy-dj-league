const cancelBtn = document.querySelector('.cancelbtn');
const signUpBtn = document.querySelector('.signupbtn');

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
        const response = await fetch({
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
signUpBtn.addEventListener('submit', signupFormHandler);