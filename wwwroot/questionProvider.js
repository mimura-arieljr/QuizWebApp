function getQuestions(difficulty, category) {
    return fetch('wwwroot/exam.json')
        .then((response) => response.json())
        .then((data) => {
            // Filter questions based on difficulty and category
            const filteredQuestions = data.filter((question) => {
                return question.Difficulty === difficulty && question.Category === category;
            });

            // Shuffle the filtered questions array using Fisher-Yates shuffle algorithm
            for (let i = filteredQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
            }

            const uniqueQuestions = new Set(); // Use a Set to ensure uniqueness

            // Populate the Set with unique questions
            for (const question of filteredQuestions) {
                if (uniqueQuestions.size < 2) {
                    uniqueQuestions.add(question);
                } else {
                    break;
                }
            }

            // Convert the Set back to an array
            const selectedQuestions = Array.from(uniqueQuestions);
            return selectedQuestions;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

// Call this function to start displaying questions
export function startQuiz() {
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

let currentScore = 0;
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
        answerInput.placeholder = question.QuestionType == 'TrueFalse' ? 'True or False' : 'Your answer...';
        answerInput.className = 'form-control border-dark';

        const verificationText = document.createElement('span');
        verificationText.className = ('small mt-2 text-right')

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.className = 'btn btn-sm btn-outline-dark mt-3 col-md-3 justify-content-end';

        submitButton.addEventListener('click', () => {
            const userAnswer = answerInput.value;
            if (userAnswer.toLowerCase() === question.Answer.toLowerCase()) {
                currentScore++;
                answerInput.className = 'form-control border-success';
                submitButton.className = 'custom-hidden';
                verificationText.innerHTML = `Correct! Current Score: ${currentScore}`;
            } else {
                answerInput.className = 'form-control border-danger'
                submitButton.className = 'custom-hidden';
                verificationText.innerHTML = `Correct Answer: ${question.Answer}`;
            }

            setTimeout(function () {
                // Move to the next question
                questionDiv.remove();
                populateWithQuestion(selectedQuestions, questionCount + 1);
            }, 2000)
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answerInput);
        questionDiv.appendChild(verificationText);
        questionDiv.appendChild(submitButton);

        questionContainer.appendChild(questionDiv);
    } else {
        const resultText = document.createElement('p');
        let highScore = getHighScore();

        if (highScore === null || currentScore > parseInt(highScore)) {
            setHighScore(currentScore);
            highScore = currentScore;
            if (currentScore > 0 ) {
                resultText.className = 'blinking-border';
            }
        }

        resultText.innerHTML =
            `<strong>Quiz Complete</strong>` +
            `<p class='mt-2 small text-center'>Total Score: ${currentScore}</p>` +
            `<p class='mt-2 small text-center'>High Score: ${highScore}</p>`;

        questionContainer.appendChild(resultText);

        setTimeout(function () {
            location.reload()
        }, 2500);

    }
}

function setHighScore(score) {
    sessionStorage.setItem('highscore', score)
}

function getHighScore() {
    return sessionStorage.getItem('highscore');
}