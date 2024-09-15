const questions = [
    {
        question: "Nguyên tố hiếm nhất xuất hiện tự nhiên trong lớp vỏ Trái Đất là gì?",
        answer: "Astatine",
    },
    {
        question: "Laptop của người làm ra trang web này mang thương hiệu gì?",
        answer: "Acer",
    },
    {
        question: "Dãy số 3, 5, 17, 257,... được gọi dãy số gì",
        answer: "Fermat",
    },
    {
        question: "11111101000 là bao nhiêu ở dạng thập phân?",
        answer: "2024",
    },
    {
        question: "Tên nhà phát triển của tựa game từng đạt giải Game Of The Year 2022: ",
        answer: "FromSoftware",
    },
];

let enableInput = true;

const Question = document.querySelector(".question");
const answerInput = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const review = document.querySelector(".review");
let currentQuestionIndex = 0;
let currScore = 0;
let score = document.querySelector(".score");
const nextButton = document.querySelector(".next");
let currentQuestion;

function startGame(){
    currentQuestionIndex = 0;
    questions.sort(()=> Math.random() > 0.5 ? 1: -1);
    showQuestion();
}

function showQuestion(){
    resetState();
    currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    Question.innerHTML = "Câu " + questionNum + ". " + currentQuestion.question;
}

submitBtn.addEventListener("click", getAnswer);

function resetState(){
    nextButton.style.display = "none";
    review.innerHTML = '';
    answerInput.value = '';
}

answerInput.onfocus = () => {
    if(!enableInput){
        answerInput.blur();
    }
}

function getAnswer(){
    if(answerInput.value == ''){
        review.innerHTML = "Nhập đáp án chưa bạn êy?";
        setTimeout(() =>{
            review.innerHTML = '';
        }, 3000);
        return;
    }
    else if(answerInput.value === currentQuestion.answer){
        enableInput = false;
        submitBtn.disabled = true;
        review.innerHTML = "Chính xác!";
        currScore++;
        score.innerHTML = `${currScore}/5`;
        if(currScore == 5){
            score.style = "color: green; background-color: white";
            setTimeout(()=>{
                document.querySelector(".continue-container").style.display = "block";
            }, 1000);
            return;
        }
        nextButton.style.display = "block";
    }
    else{
        review.innerHTML = "Sai ròi";
    }
}

nextButton.addEventListener("click", ()=>{
    enableInput = true;
    submitBtn.disabled = false;
    currentQuestionIndex++;
    showQuestion();
})

startGame();