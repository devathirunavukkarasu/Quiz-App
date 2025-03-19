const questions=[
    {
        question:"What is the largest animal in world?",
        answers:[
            {text:"Giraffe", correct:false},
            {text:"Shark", correct:false},
            {text:"Blue whale", correct:true},
            {text:"Elephant", correct:false},
        ]
    },
    {
        question:"Who has won the most Grand Slam titles in tennis?",
        answers:[
            {text:"Venus Williams", correct:false},
            {text:"Serena Williams", correct:false},
            {text:"Homer Simpson", correct:false},
            {text:"Margaret Court", correct:true},
        ]
    },
    {
        question:"Which sport uses the terms 'spare' and 'strike'?",
        answers:[
            {text:"Cricket", correct:false},
            {text:"Bowling", correct:true},
            {text:"Baseball", correct:false},
            {text:"Chess", correct:false},
        ]
    },
    {
        question:"Who was the first President of the United States?",
        answers:[
            {text:"George Washinton", correct:true},
            {text:"Thomas Jefferson", correct:false},
            {text:"Napolean Bonaparte", correct:false},
            {text:"John Adams", correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answerbuttons");
const nextBtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+ currentQuestion.question;

   currentQuestion.answers.forEach(answer=>{
    const button=document.createElement('button');
    button.innerHTML=answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener('click',selectAnswer);
   })
}

function resetState(){
    nextBtn.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextBtn.style.display='block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML='Play Again';
    nextBtn.style.display="block";
}
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
showQuestion();
