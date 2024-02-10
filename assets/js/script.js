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
const submitButton = document.getElementById('submit');
const playAgainButton = document.getElementById('playAgain');
const showAnswerButton = document.getElementById('showAnswer');

var currentQuestion = 0;
var score = 0;
var incorrectAnswers = [];

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

        const optionText = document.createTextNode('input');

        option.appendChild(radio);
        option.appendChild(optionText)
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizQuestions[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizQuestions[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizQuestions[currentQuestion].answer,
            });
        }
        currentQuestion++
        selectedOption.checked = false;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    playAgainButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = "You scored ${score} out of ${quizQuestions.length}!";
}

function playQuizAgain() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    playAgainButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    playAgainButton.style.display = 'inline-block';
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

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizQuestions.length}!</p>
    <p>Incorrect Answers:</p> ${incorrectAnswersHtml}`;
}

submitButton.addEventListener('click', checkAnswer);
playAgainButton.addEventListener('click', playQuizAgain);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();