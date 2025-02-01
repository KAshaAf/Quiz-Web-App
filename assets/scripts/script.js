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
  // {
  //   question: "Who painted the Mona Lisa?",
  //   options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
  //   answer: "Leonardo da Vinci"
  // },
  // {
  //   question: "What is the largest ocean on Earth?",
  //   options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
  //   answer: "Pacific Ocean"
  // },
  // {
  //   question: "What is the chemical symbol for gold?",
  //   options: ["Au", "Ag", "Pb", "Fe"],
  //   answer: "Au"
  // },
  // {
  //   question: "Who is the author of '1984'?",
  //   options: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "Harper Lee"],
  //   answer: "George Orwell"
  // },
  // {
  //   question: "Which planet is known as the Red Planet?",
  //   options: ["Earth", "Mars", "Venus", "Jupiter"],
  //   answer: "Mars"
  // },
  // {
  //   question: "What is the tallest mountain in the world?",
  //   options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "K2"],
  //   answer: "Mount Everest"
  // },
  // {
  //   question: "What is the capital of Japan?",
  //   options: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
  //   answer: "Tokyo"
  // },
  // {
  //   question: "Which element has the atomic number 1?",
  //   options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
  //   answer: "Hydrogen"
  // },
  // {
  //   question: "What is the hardest natural substance on Earth?",
  //   options: ["Gold", "Iron", "Diamond", "Platinum"],
  //   answer: "Diamond"
  // },
  // {
  //   question: "Who invented the telephone?",
  //   options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Henry Ford"],
  //   answer: "Alexander Graham Bell"
  // },
  // {
  //   question: "What is the longest river in the world?",
  //   options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
  //   answer: "Nile River"
  // },
  // {
  //   question: "What is the capital of Australia?",
  //   options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
  //   answer: "Canberra"
  // },
  // {
  //   question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
  //   options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
  //   answer: "Carbon Dioxide"
  // },
  // {
  //   question: "What is the largest continent by area?",
  //   options: ["Africa", "Asia", "Europe", "North America"],
  //   answer: "Asia"
  // },
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

let score = 0
let currentQuestionIndex = 0


function displayQuiz(){
  let question = quizData[currentQuestionIndex].question
  quizQuestion.innerHTML = `${currentQuestionIndex+1}. ${question}`
  displayOptions(quizData[currentQuestionIndex].options)

  if(currentQuestionIndex === 0){
    prevBtn.style.display = "none"
  } else{
    prevBtn.style.display = "inline-block";  
  }

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

function realTimeFeedback(){
  //as soon as an answer is selected by the user
  //check if its correct or not 
  //if correct, show user it is the correct answer & increase score
  //if wrong, show user its wrong, show the correct answer 
  //score stays the same
  
}

function checkAnswer(selectedOption){
  const correctAnswer = quizData[currentQuestionIndex].answer

  if(correctAnswer === selectedOption){
    score++
  }
}

function nextQuestion(){
  currentQuestionIndex++

  if(currentQuestionIndex < quizData.length){
    displayQuiz()
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

//add feedback functionality at the end of the quiz 
//OR 
//add real time feedback  
//add backwards navigation - does not save the answers for previous questions
//add a progress tracker 
//add a time limit on the quiz 
//add an option to randomize the options each time the quiz is taken 
