var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerElements = document.getElementById("answers");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var highscoresButton = document.getElementById("highscores-btn");
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
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