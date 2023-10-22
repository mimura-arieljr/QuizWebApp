// Function to handle the submission of the name and showing the game controls
document.getElementById('submitName').addEventListener('click', function () {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        sessionStorage.setItem('playerName', playerName);
        displayController('nameInput','gameControls');
    }
});

// Check if the player's name is already in session storage, 
// hides name text field if it is
const storedName = sessionStorage.getItem('playerName');
if (storedName) {
    displayController('nameInput','gameControls');
}

// Event listeners for button clicks
document.getElementById('newGameBtn').addEventListener('click', function () {
    displayController('gameControls','quizDifficulty');
});

// Handles chosen difficulty and saves it on session storage
const difficultyButtons = document.querySelectorAll('.quiz-difficulty-btn');
difficultyButtons.forEach(button => {
  button.addEventListener('click', function () {
    displayController('quizDifficulty', 'quizCategories');
    sessionStorage.setItem('difficulty', this.value);
  });
});

// Handles chosen category and saves it on session storage
const categoryButtons = document.querySelectorAll('.quiz-category-btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', function () {
    displayController('quizCategories', 'questionBlock');
    sessionStorage.setItem('category', this.value);
  });
});

// Deletes the currently saved user session
document.getElementById('quitGameBtn').addEventListener('click', function () {
    sessionStorage.clear();
    location.reload();
});

// Controller for showing and hiding divs
function displayController(hide, show){
    document.getElementById(hide).className = "custom-hidden";
    document.getElementById(show).className = "d-flex flex-column";
}