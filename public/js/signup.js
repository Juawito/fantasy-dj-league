

const signupFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const userName = document.querySelector('#new-username').value.trim();
    const email = document.querySelector('#new-userEmail').value.trim();
    const password = document.querySelector('#new-userPass').value.trim();
    const repeatedPassword = document.querySelector('#password-repeat').value.trim();

    if (!password === repeatedPassword) {
        alert('Passwords do not match please try again');
        newUserPassword = '';
        newUserEmail = '';
        newUsername = '';
        repeatedPassword = '';
    } else if (firstName && lastName && userName && email && password) {
        const response = await fetch('/api/user/add', {
            method: 'POST',
            body: JSON.stringify({ userName, email, password, firstName, lastName }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
            alert('Succesfully created account')
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#signUp-form').addEventListener('submit', signupFormHandler);
