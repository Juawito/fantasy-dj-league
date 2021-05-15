const axios = require('axios').default;

const signUpNav = document.querySelector("#signUpNav");
const signInNav = document.querySelector("#signInNav");
const logOffNav = document.querySelector("#logOffNav");
const userPageNav = document.querySelector("#userPageNav");
const playoffsNav = document.querySelector("#playoffsNav");
const like = document.querySelector("#like");
function signUpNavF() {
    console.log("singup click");
}
function signInNavF() {
    console.log("in click");
}
const logOffNavF = async () => {
    const response = await axios({
        method: 'post',
        url: '/api/user/logout',
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.statusText === 'ok') {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
    console.log("off click");
}
function userPageNavF() {
    console.log("user click");
}
function playoffsNavF() {
    console.log("playoff click");
}
function likeF() {
    console.log("like click");
}
signUpNav.addEventListener("click", signUpNavF);
signInNav.addEventListener("click", signInNavF);
logOffNav.addEventListener("click", logOffNavF);
userPageNav.addEventListener("click", userPageNavF);
playoffsNav.addEventListener("click", playoffsNavF);
like.addEventListener("click", likeF);