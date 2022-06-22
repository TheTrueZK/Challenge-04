var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var highScoresButton = document.getElementById('high-scores-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timerEl = document.getElementById('countdown');
var finalScore = document.getElementById('final-score')
var score = document.getElementById('score')
var timeInterval = undefined
var timeLeft = 180;
var userScore = 0;

let shuffledQuestions, currentQuestionIndex

function countdown() {

  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds left';
      timeLeft--;
    }
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second left';
      timeLeft--;
    }
    else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      displayMessage();
    }
  }, 1000);
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  highScoresButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  timeLeft = 180;
  userScore = 0;
  countdown();
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset.correct) {
    userScore++;
    score.innerText = 'Score: ' + (userScore);
  } else {
    timeLeft = timeLeft - 10;
  }
  if (timeLeft < 1) {
    clearTimeout(timeInterval)
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    highScoresButton.classList.remove('hide')
    finalScore.classList.remove('hide')
  } if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    clearTimeout(timeInterval)
    nextButton.classList.add('hide')
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    highScoresButton.classList.remove('hide')
    finalScore.classList.remove('hide')
  } 
  }

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: 'Which U.S. president served the shortest time in office?',
    answers: [
      { text: 'William Henry Harrison', correct: true },
      { text: 'James A. Garfield', correct: false },
      { text: 'Zachary Taylor', correct: false },
      { text: 'Warren G. Harding', correct: false }
    ]
  },
  {
    question: 'Which of the 8 planets in the Solar System has the shortest day?',
    answers: [
        { text: 'Mercury', correct: false },
        { text: 'Jupiter', correct: true },
        { text: 'Saturn', correct: false },
        { text: 'Uranus', correct: false }
    ]
  },
  {
    question: 'What common leafy herb comes from the same plant as the spice Coriander Seeds?',
    answers: [
        { text: 'Sage', correct: false },
        { text: 'Parsley', correct: false },
        { text: 'Cilantro', correct: true },
        { text: 'Terragon', correct: false }
    ]
  },
  {
    question: 'Firearms were originally introduced to the islands of Japan in 1543 by what European superpower?',
    answers: [
        { text: 'the Netherlands', correct: false },
        { text: 'England', correct: false },
        { text: 'Spain', correct: false },
        { text: 'Portugal', correct: true }
    ]
  },
  {
    question: 'Before 1894, basketball was played with what kind of ball?',
    answers: [
      { text: 'A Soccer Ball', correct: true },
      { text: 'A Volleyball', correct: false },
      { text: 'A Dodgeball', correct: false },
      { text: 'A Tennisball', correct: false }
    ]
  },
  {
    question: 'The Treaty of Ghent was the peace treaty that ended which war?',
    answers: [
        { text: 'Napoleonic Wars', correct: false },
        { text: 'The War of 1812', correct: true },
        { text: 'The Spanish American War', correct: false },
        { text: 'The Hundred Day War', correct: false }
    ]
  },
  {
    question: 'In L. Frank Baum’s original 1900 novel, The Wonderful Wizard of Oz, what color were Dorothy’s shoes?',
    answers: [
        { text: 'Blue', correct: false },
        { text: 'Black', correct: false },
        { text: 'Silver', correct: true },
        { text: 'Gold', correct: false }
    ]
  },
  {
    question: 'In which Shakespeare play are Claudius and Polonius characters?',
    answers: [
        { text: 'Macbeth', correct: false },
        { text: 'Romeo and Juliet', correct: false },
        { text: 'The Tempest', correct: false },
        { text: 'Hamlet', correct: true }
    ]
  },
  {
    question: 'What was the first feature-length animated movie ever released?',
    answers: [
      { text: 'Snow White', correct: true },
      { text: 'Sleeping Beauty', correct: false },
      { text: 'Pinicchio', correct: false },
      { text: 'Dumbo', correct: false }
    ]
  },
  {
    question: 'If you order “Murgh” from the menu at an Indian restaurant, what meat will you get?',
    answers: [
        { text: 'Goat', correct: false },
        { text: 'Chicken', correct: true },
        { text: 'Lamb', correct: false },
        { text: 'Beef', correct: false }
    ]
  },
  {
    question: 'America’s first multimillionaire, John Jacob Astor, made his fortune in what trade?',
    answers: [
        { text: 'the Spice Trade', correct: false },
        { text: 'the Tobacco Trade', correct: false },
        { text: 'the Fur Trade', correct: true },
        { text: 'the Lumber Trade', correct: false }
    ]
  },
  {
    question: 'What country has the highest population of English speaking citizens after the United States?',
    answers: [
        { text: 'England', correct: false },
        { text: 'Canada', correct: false },
        { text: 'Australia', correct: false },
        { text: 'India', correct: true }
    ]
  },
  {
    question: 'What country has the highest population of followers of the Islamic Faith?',
    answers: [
      { text: 'Indonesia', correct: true },
      { text: 'Iraq', correct: false },
      { text: 'Saudi Arabia', correct: false },
      { text: 'Malaysia', correct: false }
    ]
  },
  {
    question: 'Who was the first president of the United States of America under the Articles of Confederation (1781-1789)?',
    answers: [
        { text: 'George Washington', correct: false },
        { text: 'John Hanson', correct: true },
        { text: 'Elias Budinot', correct: false },
        { text: 'Thomas Mifflin', correct: false }
    ]
  },
  {
    question: 'What is the official national summer sport of Canada?',
    answers: [
        { text: 'Basketball', correct: false },
        { text: 'Baseball', correct: false },
        { text: 'Lacrosse', correct: true },
        { text: 'Hockey', correct: false }
    ]
  },
  {
    question: 'The term ‘home run’ was already previously used in a different sport before becoming a mainstay in baseball vocabulary. What was that sport?',
    answers: [
        { text: 'Golf', correct: false },
        { text: 'Rugby', correct: false },
        { text: 'Soccer', correct: false },
        { text: 'Cricket', correct: true }
    ]
  },
  {
    question: 'Which famous rock group were formerly known as the New Yardbirds?',
    answers: [
      { text: 'Led Zeppelin', correct: true },
      { text: 'ACDC', correct: false },
      { text: 'The Doors', correct: false },
      { text: 'The Rolling Stones', correct: false }
    ]
  },
  {
    question: 'The only known monotremes in the animal kingdom are the echidna and which other creature?',
    answers: [
        { text: 'Kangaroos', correct: false },
        { text: 'Platypuses', correct: true },
        { text: 'Sugar Gliders', correct: false },
        { text: 'Ostritches', correct: false }
    ]
  },
  {
    question: 'Aqua Regia, a chemical mixture that notably can dissolve noble metals like gold and platinum, is a mixture of what two acids?',
    answers: [
        { text: 'Nitric and Acetic Acid', correct: false },
        { text: 'Hydrochloric and Sulfuric Acid', correct: false },
        { text: 'Nitric and Hydrochloric Acid', correct: true },
        { text: 'Citric and Acetic Acid', correct: false }
    ]
  },
  {
    question: ' “Les Fauves” was a name given to a group of artists that included Henri Matisse. What is the literal meaning of “Les Fauves”?',
    answers: [
        { text: 'the Favorites', correct: false },
        { text: 'the Wildcats', correct: false },
        { text: 'the Colorful Ones', correct: false },
        { text: 'the Wild Beasts', correct: true }
    ]
  },
  {
    question: 'Which three countries all border South Africa?',
    answers: [
      { text: 'Namibia, Zimbabwe, Eswatini', correct: true },
      { text: 'Angola, Botswana, Zimbabwe', correct: false },
      { text: 'Zambia, Tanzania, Lesotho', correct: false },
      { text: 'Malawi, Botswana, Eswatini', correct: false }
    ]
  },
  {
    question: 'How many vowels can be modified with an umlaut (two dots above the letter) for use in the German alphabet?',
    answers: [
        { text: '1', correct: false },
        { text: '3', correct: true },
        { text: '2', correct: false },
        { text: '4', correct: false }
    ]
  },
  {
    question: 'What is the Latin word for seasickness?',
    answers: [
        { text: 'Mare', correct: false },
        { text: 'Languor', correct: false },
        { text: 'Nausea', correct: true },
        { text: 'Caligo', correct: false }
    ]
  },
  {
    question: 'What medicinal plant known for its soothing, moisturizing, and cooling effects is also poisonous to cats and dogs?',
    answers: [
        { text: 'Mint', correct: false },
        { text: 'Coconut', correct: false },
        { text: 'Awapuhi Ginger', correct: false },
        { text: 'Aloe Vera', correct: true }
    ]
  },
  {
    question: 'What Belgian monarch was responsible for the deaths of approximately 10 million Congolese Africans, leading to the use of the term “crime against humanity”?',
    answers: [
      { text: 'King Leopold II', correct: true },
      { text: 'King Albert I', correct: false },
      { text: 'King Baudouin', correct: false },
      { text: 'King Philippe', correct: false }
    ]
  },
  {
    question: 'What group of people known for their prodigious horse riding skills, migrated from the Ural Mountains to the Carpathian Basin to form the Principality of Hungary?',
    answers: [
        { text: 'the Huns', correct: false },
        { text: 'the Magyars', correct: true },
        { text: 'the Mongols', correct: false },
        { text: 'the Sámi', correct: false }
    ]
  },
  {
    question: 'What general and primary military strategist of Genghis and Ögedei Khan took Mongol armies from Central Asia to the Russian Steppe and into Europe to devastate the armies of Russia, Georgia, Hungary, Poland, Bulgaria, and Latin Constantinople?',
    answers: [
        { text: 'Mukhulai', correct: false },
        { text: 'Zev', correct: false },
        { text: 'Subutai', correct: true },
        { text: 'Borokhula', correct: false }
    ]
  },
  {
    question: 'What 5 spices are in Chinese 5 spice?',
    answers: [
        { text: 'Cumin, Cinnamon, Dried Orange Peel, Clove, and Star Anise', correct: false },
        { text: 'Black Cardamom, Clove, Star Anise, Fennel Seed, and Bay Leaves', correct: false },
        { text: 'Cinnamon, Clove, White Pepper, Bay Leaves, and Dried Chilies', correct: false },
        { text: 'Cinnamon, Star Anise, Clove, Fennel Seed, and Szechuan Peppercorn', correct: true }
    ]
  },
]