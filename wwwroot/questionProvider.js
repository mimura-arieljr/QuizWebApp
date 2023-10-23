export function getQuestions(difficulty, category) {
    fetch('wwwroot/exam.json')
        .then((response) => response.json())
        .then((data) => {
            // Filter questions based on difficulty and category
            const filteredQuestions = data.filter((question) => {
                return question.Difficulty === difficulty && question.Category === category;
            });

            const uniqueQuestions = new Set(); // Use a Set to ensure uniqueness

            // Populate the Set with unique questions
            for (const question of filteredQuestions) {
                if (uniqueQuestions.size < 10) {
                    uniqueQuestions.add(question);
                } else {
                    break;
                }
            }

            // Convert the Set back to an array
            const selectedQuestions = Array.from(uniqueQuestions);

            // You can now work with the selectedQuestions array
            console.log(selectedQuestions);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
