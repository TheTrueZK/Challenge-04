var questionContainer = document.getElementById("question-container");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var highscoresButton = document.getElementById("highscores-btn");
var shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    nextQuestion()
}

function nextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    
}

function selectAnswer() {
    
}

var questions = [
    {
        question: "Who's Joe?",
        answers: [
            {text: 'mama', correct: true},
            {text: 'daddy', correct: false},
        ]
    }
]