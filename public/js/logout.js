

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
logOffNav.addEventListener("click", logOffNavF);