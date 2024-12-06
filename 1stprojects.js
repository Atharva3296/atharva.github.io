document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "What is the capital of France?",
            choices: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            correctAnswer: 0
        },
        {
            question: "What is the largest mammal in the world?",
            choices: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
            correctAnswer: 2
        },
        {
            question: "Who painted the Mona Lisa?",
            choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical symbol for gold?",
            choices: ["Ag", "Au", "Fe", "Cu"],
            correctAnswer: 1
        },
        {
            question: "Which country is home to the kangaroo?",
            choices: ["New Zealand", "South Africa", "Australia", "Brazil"],
            correctAnswer: 2
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: 1
        },
        {
            question: "What is the hardest natural substance on Earth?",
            choices: ["Gold", "Iron", "Diamond", "Titanium"],
            correctAnswer: 2
        },
        {
            question: "Which of these is not a primary color?",
            choices: ["Red", "Blue", "Green", "Yellow"],
            correctAnswer: 3
        }
    ];

    
    function addQuestion(question, choices, correctAnswer) {
        quizData.push({
            question: question,
            choices: choices,
            correctAnswer: correctAnswer
        });
    }

    
    addQuestion(
        "What is the largest continent by land area?",
        ["Africa", "North America", "Asia", "Europe"],
        2
    );

    

    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = -1;

    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    const submitBtn = document.getElementById("submit");
    const quizEl = document.getElementById("quiz");
    const scoreEl = document.getElementById("score");
    const questionNumberEl = document.getElementById("question-number");
    const totalQuestionsEl = document.getElementById("total-questions");

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionEl.textContent = question.question;
        choicesEl.innerHTML = "";

        question.choices.forEach((choice, index) => {
            const choiceEl = document.createElement("div");
            choiceEl.classList.add("choice");
            choiceEl.textContent = choice;
            choiceEl.addEventListener("click", () => selectChoice(index));
            choicesEl.appendChild(choiceEl);
        });

        submitBtn.disabled = true;
        questionNumberEl.textContent = currentQuestion + 1;
        totalQuestionsEl.textContent = quizData.length;
    }

    function selectChoice(index) {
        const choices = choicesEl.children;
        for (let i = 0; i < choices.length; i++) {
            choices[i].classList.remove("selected");
        }
        choices[index].classList.add("selected");
        selectedAnswer = index;
        submitBtn.disabled = false;
    }

    function checkAnswer() {
        if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
            score++;
            updateScore();
            speakFeedback("Correct! Great job!");
        } else {
            speakFeedback("Sorry, that's incorrect. The correct answer is " + quizData[currentQuestion].choices[quizData[currentQuestion].correctAnswer]);
        }
        currentQuestion++;
        selectedAnswer = -1;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function updateScore() {
        scoreEl.textContent = score;
    }

    function showResults() {
        quizEl.style.display = "none";
        updateScore();
        questionNumberEl.textContent = quizData.length;
        speakFeedback(`Quiz completed! Your final score is ${score} out of ${quizData.length}.`);
    }

    function speakFeedback(text) {
        if (responsiveVoice) {
            responsiveVoice.speak(text);
        }
    }

    submitBtn.addEventListener("click", checkAnswer);

    loadQuestion();
    updateScore();
});

