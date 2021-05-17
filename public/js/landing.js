const signUpNav = document.querySelector("#signUpNav");
const signInNav = document.querySelector("#signInNav");

function signUpNavF() {
    document.location.replace('/signup');
}
function signInNavF(event) {
event.stopPropagation();
document.location.replace('/login');
}
signUpNav.addEventListener("click", signUpNavF);
signInNav.addEventListener("click", signInNavF);