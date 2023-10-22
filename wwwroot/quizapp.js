// Function to handle the submission of the name and showing the game controls
document.getElementById('submitName').addEventListener('click', function () {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        // Store the name in session storage
        sessionStorage.setItem('playerName', playerName);
        // Hide the name input and show the game controls
        document.getElementById('nameInput').style.display = 'none';
        document.getElementById('gameControls').className = "d-flex flex-column";
    }
});

// Check if the player's name is already in session storage
const storedName = sessionStorage.getItem('playerName');
if (storedName) {
    // Hide the name input and show the game controls
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('gameControls').className = "d-flex flex-column";
}

document.getElementById('newGameBtn').addEventListener('click', function () {
    document.getElementById('gameControls').className = "custom-hidden";
    document.getElementById('quizCategories').className = "d-flex flex-column";
});

document.getElementById('quitGameBtn').addEventListener('click', function () {
    sessionStorage.clear();
    location.reload();
});
