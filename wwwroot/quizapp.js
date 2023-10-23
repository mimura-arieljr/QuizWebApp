import { getQuestions } from "./questionProvider.js";

// Function to handle the submission of the name and showing the game controls
document.getElementById('submitName').addEventListener('click', function () {
  const playerName = document.getElementById('playerName').value;
  if (playerName) {
    sessionStorage.setItem('playerName', playerName);
    displayController('nameInput', 'gameControls');
  }
});

// Check if the player's name is already in session storage, 
// hides name text field if it is
const storedName = sessionStorage.getItem('playerName');
if (storedName) {
  displayController('nameInput', 'gameControls');
}

// Event listeners for button clicks
document.getElementById('newGameBtn').addEventListener('click', function () {
  displayController('gameControls', 'quizDifficulty');
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
    displayController('quizCategories', 'questionContainer');
    sessionStorage.setItem('category',this.value);
    populateWithQuestion();
  });
});

// Handles populating div with questions
function populateWithQuestion() {
  const questionContainer = document.getElementById('questionContainer');
  const difficulty = sessionStorage.getItem('difficulty');
  const category = sessionStorage.getItem('category');
  getQuestions(difficulty,category)
    .then((selectedQuestions) => {
      // Loop through the selected questions and create elements to display them
      for (const question of selectedQuestions) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
        <strong>Question ID:</strong> ${question.QuestionID}<br>
        <strong>Category:</strong> ${question.Category}<br>
        <strong>Difficulty:</strong> ${question.Difficulty}<br>
        <strong>Question Type:</strong> ${question.QuestionType}<br>
        <strong>Question:</strong> ${question.Question}<br><br>
      `;
        questionContainer.appendChild(questionDiv);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


// Deletes the currently saved user session
document.getElementById('quitGameBtn').addEventListener('click', function () {
  sessionStorage.clear();
  location.reload();
});

// Controller for showing and hiding divs
function displayController(hide, show) {
  document.getElementById(hide).className = "custom-hidden";
  document.getElementById(show).className = "d-flex flex-column";
}