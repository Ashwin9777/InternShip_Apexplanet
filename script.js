const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correctAnswer: 0
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "H2SO4"],
        correctAnswer: 1
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Korea", "Thailand"],
        correctAnswer: 1
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "50,000 km/s"],
        correctAnswer: 0
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Mount Kilimanjaro"],
        correctAnswer: 0
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Picasso", "Van Gogh", "Da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Southern", "Pacific"],
        correctAnswer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    const buttons = document.querySelectorAll("#answers-container button");
    
    currentQuestion.options.forEach((option, index) => {
        buttons[index].innerText = option;
        buttons[index].onclick = () => checkAnswer(index);
    });
}

function checkAnswer(answerIndex) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const resultElement = document.getElementById("result");

    if (answerIndex === correctAnswer) {
        score++;
        resultElement.innerText = "Correct!";
        resultElement.className = "correct";
    } else {
        resultElement.innerText = "Incorrect!";
        resultElement.className = "incorrect";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultElement.innerText = "";
            loadQuestion();
        }, 1000);
    } else {
        setTimeout(() => {
            resultElement.innerText = `Quiz Over! Your score is ${score}/${questions.length}`;
            resultElement.className = "";
        }, 1000);
    }
}

async function fetchJoke() {
    const jokeElement = document.getElementById("joke");
    jokeElement.innerText = "Loading...";

    try {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
        if (!response.ok) throw new Error("Failed to fetch joke");
        const data = await response.json();
        jokeElement.innerText = `${data.setup} - ${data.punchline}`;
    } catch (error) {
        jokeElement.innerText = "Failed to fetch joke. Please try again.";
    }
}

loadQuestion();
