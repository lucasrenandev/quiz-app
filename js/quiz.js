// Modo estrito
"use strict"

// Elementos
const startQuiz = document.getElementById("start")
const mainContainer = document.getElementById("main")
const questionsAmount = document.getElementById("questions-amount")
const amount = document.getElementById("amount")
const questionTitle = document.getElementById("question-title")
const title = document.getElementById("title")
const questionsButton = document.getElementById("questions")
const exitContent = document.getElementById("exit-content")
const exitText = document.getElementById("exit-text")
const refresh = document.getElementById("refresh")

import questions from "./questions.js"

let currentIndex = 0
let questionCorrect = 0

// Iniciar quiz
startQuiz.addEventListener("click", () => {
    mainContainer.style.display = "flex"
    questionsAmount.style.display = "block"
    questionTitle.style.display = "block"
    questionsButton.style.display = "block"
    startQuiz.style.display = "none"
})

// Reiniciar quiz
refresh.addEventListener("click", () => {
    mainContainer.style.display = "none"
    exitContent.style.display = "none"
    startQuiz.style.display = "block"

    currentIndex = 0
    questionCorrect = 0
    loadQuestions()
})

// Próxima questão
function nextQuestion(event) {
    if(event.target.getAttribute("data-correct") === "true") {
        questionCorrect ++
    }
    if(currentIndex < questions.length - 1) {
        currentIndex ++
        loadQuestions()
    }
    else {
        finish()
    }
}

// Resultado final
function finish() {
    exitText.textContent = `Você acertou ${questionCorrect} de ${questions.length} questões!`
    questionsAmount.style.display = "none"
    questionsButton.style.display = "none"
    questionTitle.style.display = "none"
    exitContent.style.display = "flex"
}

// Carregar questões
function loadQuestions() {
    amount.textContent = `${currentIndex + 1} / ${questions.length}`
    
    const questionsItems = questions[currentIndex]
    questionsButton.textContent = ""
    title.textContent = questionsItems.question
    
    questionsItems.answers.forEach((answer) => {
        const buttonElement = document.createElement("button")
        
        buttonElement.classList.add("answer")
        buttonElement.setAttribute("data-correct", answer.correct)
        buttonElement.textContent = answer.option
        questionsButton.appendChild(buttonElement)
        
        document.querySelectorAll(".answer").forEach((button) => {
            button.addEventListener("click", nextQuestion) 
        })
    })
}
loadQuestions()