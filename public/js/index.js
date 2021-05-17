
const logOffNav = document.querySelector("#logOffNav");
const homeButton = document.querySelector("#userPageNav");
const playoffsNav = document.querySelector("#playoffsNav");
const like = document.querySelector("#like");
const allPlaylistsBtn = document.querySelector("#allPlaylists");

function allPlaylistsF() {
    document.location.replace('/all');
}
const logOffNavF = async (event) => {
    event.stopPropagation();
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
    console.log("off click");
}
function backToHome() {
    document.location.replace('/profile');
    console.log("user click");
}
async function playoffsNavF(){
    document.location.replace('/');
    
    console.log("playoff click");
}
function likeF(event) {
    event.stopPropagation();
    console.log("like click");
}

allPlaylistsBtn.addEventListener("click", allPlaylistsF)
logOffNav.addEventListener("click", logOffNavF);
homeButton.addEventListener("click", backToHome);
playoffsNav.addEventListener("click", playoffsNavF);
// like.addEventListener("click", likeF);