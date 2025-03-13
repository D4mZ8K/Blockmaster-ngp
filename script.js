function checkLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "admin_isa" && password === "4aPTaH110866D4mZ8K") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("game-container").style.display = "block";
        startGame();
    } else {
        document.getElementById("error-message").innerText = "Wrong username or password!";
    }
}

function startGame() {
    alert("Game starts here! Implement BlockBlast logic.");
}
