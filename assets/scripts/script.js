const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
    hint: "This is a hint for the question 1."
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    answer: "Harper Lee",
    hint: "This is a hint for the question 2."
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mars", "Earth", "Mercury", "Venus"],
    answer: "Mercury",
    hint: "This is a hint for the question 3."
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
];

const mainEL = document.getElementById("main-el")
const quizQuestion= document.getElementById("question")
const quizOptions= document.getElementById("options")
const nextBtn= document.getElementById("next-btn")
const prevBtn= document.getElementById("prev-btn")
const submitBtn = document.getElementById("submit-btn")
const scoreEl = document.getElementById("score-el")
const restartBtn = document.getElementById("restart-btn")
const hint = document.getElementById("hint")
const hintText = document.getElementById("hint-text")
const selectionResult = document.getElementById("selection-result")
const bar = document.getElementById("bar")

let score = 0
let currentQuestionIndex = 0
let progress = 0

function displayQuiz(){
  let question = quizData[currentQuestionIndex].question
  quizQuestion.innerHTML = `${currentQuestionIndex+1}. ${question}`
  displayOptions(quizData[currentQuestionIndex].options)

  prevBtn.style.display = "none"

  // if(currentQuestionIndex === 0){
  //   prevBtn.style.display = "none"
  // } else{
  //   prevBtn.style.display = "inline-block";  
  // }

  if (currentQuestionIndex === quizData.length - 1) {
    nextBtn.style.display = "none";  
    submitBtn.style.display = "inline-block"; 
  } else {
    nextBtn.style.display = "inline-block";  
    submitBtn.style.display = "none"; 
  }

}
displayQuiz()

function displayOptions(optionsArray){
  let options = ""
  for(let i=0;i<optionsArray.length;i++){
    options+=
    `<li>
      <input type="radio" name="option-el" value="${optionsArray[i]}">
      ${optionsArray[i]} 
    </li>`
  }
  quizOptions.innerHTML = options
}

hint.addEventListener("click", function(){
  if(hintText.style.display === "none"){
    hintText.innerHTML = quizData[currentQuestionIndex].hint
    hintText.style.display = "block"
  }else {
    hintText.style.display = "none"
  }
})

  document.addEventListener("change", (event) => {
    const correctAnswer = quizData[currentQuestionIndex].answer
    let selectedOption;

    if (event.target.matches('input[name="option-el"]')) {
      selectedOption = event.target
      if(selectedOption.value === correctAnswer){
        selectionResult.innerHTML = `Your answer is correct!`
        disableNewSelection()
        //updateProgressTracker()
        score++
      } else {
        selectionResult.innerHTML = `Wrong answer. The correct answer is ${correctAnswer}.`
        disableNewSelection()
        //updateProgressTracker()
      }
    } else {
      console.error("No match found in the document")
    }
  });


function disableNewSelection(){
  const radioButtons = document.querySelectorAll('input[name = "option-el"]')
  for(var i=0;i<radioButtons.length;i++) {
    radioButtons[i].disabled = true;
 }
}

function checkAnswer(selectedOption){
  const correctAnswer = quizData[currentQuestionIndex].answer

  if(correctAnswer === selectedOption){
    score++
  }
}

function nextQuestion(){
  selectionResult.innerHTML = ""
  currentQuestionIndex++

  if(currentQuestionIndex < quizData.length){
    displayQuiz()
    updateProgressTracker()
  }
}

prevBtn.addEventListener("click",function(){
  if(currentQuestionIndex > 0){
    currentQuestionIndex--
    displayQuiz()
  }
})

nextBtn.addEventListener("click",function(){
  const selectedOption = document.querySelector('input[name = "option-el"]:checked')
  if(selectedOption === null){
    nextQuestion()
  } else {
    checkAnswer(selectedOption.value)
    nextQuestion()
  }
})

submitBtn.addEventListener("click", function(){
  const selectedOption = document.querySelector('input[name = "option-el"]:checked')
  checkAnswer(selectedOption.value)
  mainEL.innerHTML = `<h4>Your responses have been submitted. You have scored ${score} out of ${quizData.length}.</h4>`
})

function updateProgressTracker(){
 const totalProgress = quizData.length

 if(progress < totalProgress){
  progress++
  let width = (progress / totalProgress)* 100
  bar.style.width = `${width}%`
  bar.innerHTML = `${width}%`
 }}
 
