const signUpNav = document.querySelector("#signUpNav");
const signInNav = document.querySelector("#signInNav");
const logOffNav = document.querySelector("#logOffNav");
const homeButton = document.querySelector("#userPageNav");
const playoffsNav = document.querySelector("#playoffsNav");
const like = document.querySelector("#like");
function signUpNavF() {
        document.location.replace('/signup');
}
function signInNavF() {
    document.location.replace('/login');
}
const logOffNavF = async () => {
    const response = await fetch({
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
function backToHome() {
    document.location.replace('/');
    console.log("user click");
}
async function playoffsNavF(){
    const response = await fetch({
        method: 'get',

    })
    console.log("playoff click");
}
function likeF() {
    console.log("like click");
}
signUpNav.addEventListener("click", signUpNavF);
signInNav.addEventListener("click", signInNavF);
logOffNav.addEventListener("click", logOffNavF);
homeButton.addEventListener("click", backToHome);
playoffsNav.addEventListener("click", playoffsNavF);
// like.addEventListener("click", likeF);