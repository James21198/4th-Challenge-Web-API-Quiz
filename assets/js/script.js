const quizQuestions = [
    {
        question: 'Commonly used data types DOES NOT include:',
        options: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        options: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        options: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        answer: 'console.log',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const resultText = document.getElementById('result-text');
const playAgainButton = document.getElementById('playAgain');
const showAnswerButton = document.getElementById('showAnswer');
const startQuizButton = document.getElementById('startQuiz')
const saveScoreButton = document.getElementById('saveScore')

var currentQuestion = 0;
var score = 0;
var incorrectAnswers = [];

var timeLeft = 30;
var timerEl = document.getElementById('timer-div');
var timerId

function countdown() {
    if (timeLeft <= 0) {
        displayResult();
        return;
    } else {
        timerEl.innerHTML = timeLeft;
        timeLeft--;
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizQuestions[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (var i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];
        radio.onclick = checkAnswer;

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText)
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer(event) {
    const selectedOption = event.target.value
    
    if (selectedOption === quizQuestions[currentQuestion].answer) {
            score++;
    } else {
        timeLeft -=5;
        incorrectAnswers.push({
            question: quizQuestions[currentQuestion].question,
            incorrectAnswer: selectedOption,
            correctAnswer: quizQuestions[currentQuestion].answer,
        });
    }
    
    currentQuestion++
    selectedOption.checked = false;

    console.log(currentQuestion, quizQuestions.length);
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    clearInterval(timerId);
    timeLeft = 0;
    
    saveScoreButton.style.display = 'inline-block';
    quizContainer.style.display = 'none';
    playAgainButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.style.display = 'inline-block'
    resultText.innerHTML = `You scored ${score} out of ${quizQuestions.length}!`;
}

function playQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    
    timerId = setInterval(countdown, 600);

    incorrectAnswers = [];

    quizContainer.style.display = 'block';
    saveScoreButton.style.display = 'none';
    playAgainButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    startButton.style.display = 'none';
    resultContainer.style.display = 'none';
    resultText.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    playAgainButton.style.display = 'inline-block';
    resultContainer.style.display = 'inline-block';
    resultText.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    var incorrectAnswersHtml = '';
    for (var i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
         <p>
            <Strong>Question:</Strong> ${incorrectAnswers [i].question}<br>
            <Strong>Your Answer:</Strong> ${incorrectAnswers [i].incorrectAnswer}<br>
            <Strong>Correct Answer:</Strong> ${incorrectAnswers [i].correctAnswer}
         </p>   
      `;    
    }

    resultText.innerHTML = `
    <p>You scored ${score} out of ${quizQuestions.length}!</p>
    <p>Incorrect Answers:</p> ${incorrectAnswersHtml}`;
}

function saveScore() {
    var initials = document.getElementById('initials').value;

    if (!initials) {
        alert('Please enter your initials');
        return;
    }
    
    localStorage.setItem(initials, score);
}

playAgainButton.addEventListener('click', playQuiz);
showAnswerButton.addEventListener('click', showAnswer);
startButton.addEventListener('click', playQuiz);
saveScoreButton.addEventListener('click', saveScore);