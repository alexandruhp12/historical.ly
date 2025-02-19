import SharedData from 'storage.js'

function checkAuth() {
    const text = document.getElementById("user");
    SharedData.username = text;
}