const form = document.querySelector("form");
const sumbit = document.querySelector("#submit");
const next = document.querySelector("#next");

let inputLabel = document.querySelector("#inputLabel");
let answerInput = document.querySelector("#answerInput");
let showAnswer = document.querySelector("#showAnswer");
let isShowingAnswer = false;
let questionPrompt = document.querySelector("#question");
let message = document.querySelector("#message");
let questionsCompleted = 0;
let currentPrompt = {};
let progressElement = document.querySelector("#progress");
let progressLabel = document.querySelector("#progressLabel");

const randomizeQuestions = () => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
};

const quizCompleted = () => {
  questionPrompt.style.display = "none";
  inputLabel.style.display = "none";
  answerInput.style.display = "none";
  sumbit.style.display = "none";
  next.style.display = "none";
  progressElement.style.display = "none";
  progressLabel.style.display = "none";
  message.innerText = "Great Job completing this Quiz 🥳";
  showAnswer.style.display = "none";
};

const fetchQuestion = () => {
  if (questionsCompleted === questions.length) {
    quizCompleted();
    return; // done
  }

  currentPrompt = questions[questionsCompleted];

  const question = currentPrompt.question;

  questionPrompt.innerText = question;

  if (currentPrompt.answer.length > 1) {
    let span = document.createElement("span");
    span.style.color = "#d90429";
    span.innerText = " (Note: please add commas between your answers)";
    questionPrompt.append(span);
  }

  questionsCompleted += 1;

  message.innerText = "";
  showAnswer.innerText = "Show Answer";
  isShowingAnswer = false;

  next.disabled = true
};

const checkAnswer = () => {
  const userAnswerArr = answerInput.value
    .toLowerCase()
    .split(",")
    .map((answer) => answer.trim());
  const correctAnswerArr = currentPrompt.answer.map((answer) =>
    answer.toLowerCase()
  );

  let checker = (arr, target) => target.every((v) => arr.includes(v));

  const isCorrect = checker(correctAnswerArr, userAnswerArr);

  isCorrect
    ? (message.innerText = "Correct")
    : (message.innerText = "Incorrect");
};

// start up logic
progressElement.max = questions.length;

randomizeQuestions();

fetchQuestion();

// action: fetch next question
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    checkAnswer();
    return;
  }
});

next.addEventListener("click", () => {
  answerInput.value = "";
  message.innerText = "";
  fetchQuestion();
  progressElement.value = questionsCompleted;
  answerInput.focus();
});

// action: answer submitted
sumbit.addEventListener("click", () => {
  checkAnswer();
  next.disabled = false
});

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

showAnswer.addEventListener("click", () => {
  if (!isShowingAnswer) {
    message.innerText = currentPrompt.answer;
    showAnswer.innerText = "Hide Answer";
  } else {
    message.innerText = "";
    showAnswer.innerText = "Show Answer";
  }
  isShowingAnswer = !isShowingAnswer;
});

study.addEventListener('click', (event) => {
  const isConfirmed = confirm('This will erase your progress, are you sure you want to end your Quiz?')
  if(isConfirmed) {
    // navigate to study page
    window.location.href = 'study.html';
  } 
})
