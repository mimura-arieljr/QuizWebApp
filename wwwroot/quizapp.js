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
    startQuiz();
  });
});

// Call this function to start displaying questions
function startQuiz() {
  const difficulty = sessionStorage.getItem('difficulty');
  const category = sessionStorage.getItem('category');
  getQuestions(difficulty, category)
    .then((selectedQuestions) => {
      populateWithQuestion(selectedQuestions, 0);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function populateWithQuestion(selectedQuestions, questionCount) {
  const questionContainer = document.getElementById('questionContainer');

  if (questionCount < selectedQuestions.length) {
    // Display the question
    const question = selectedQuestions[questionCount];
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'd-flex flex-column';
    
    const questionText = document.createElement('p');
    questionText.innerHTML = `<strong>Question:</strong> ${question.Question}`;
    
    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.placeholder = 'Your answer...';
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className ='btn btn-sm btn-outline-dark mt-3 col-md-3 justify-content-end';

    submitButton.addEventListener('click', () => {
      const userAnswer = answerInput.value;
      console.log('User Answer:', userAnswer);
      
      // Move to the next question
      questionDiv.remove();
      populateWithQuestion(selectedQuestions, questionCount + 1);
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answerInput);
    questionDiv.appendChild(submitButton);
    questionContainer.appendChild(questionDiv);
  } else {
    console.log("All questions displayed.");
  }
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