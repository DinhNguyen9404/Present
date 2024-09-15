const questions = [
    {
        question: "Chu kỳ bán rã của một đồng vị phóng xạ là T = 138 ngày. Sau thời gian t = 276 ngày thì khối lượng chất phóng xạ còn lại bằng bao nhiêu phần trăm khối lượng ban đầu?",
        answers: [
            {text: "100%", correct: false},
            {text: "50%", correct: false},
            {text: "25%", correct: true},
            {text: "12.5%", correct: false},
        ]
    },
    {
        question: "Để xác định nồng độ của dung dịch NaOH, người ta tiến hành chuẩn độ dung dịch NaOH bằng dung dịch HCl có nồng độ đã biết. Phương pháp chuẩn độ này gọi là:",
        answers: [
            {text: "Chuẩn độ oxy hóa khử", correct: false},
            {text: "Chuẩn độ kết tủa", correct: false},
            {text: "Chuẩn độ axit-bazơ", correct: true},
            {text: "Chuẩn độ phức", correct: false},
        ]
    },
    {
        question: "Một hộp đựng 5 quả bóng màu đỏ và 3 quả bóng màu xanh. Lấy ngẫu nhiên 2 quả bóng từ hộp. Xác suất để lấy được 2 quả bóng cùng màu là:",
        answers: [
            {text: "13/28", correct: true},
            {text: "1/2", correct: false},
            {text: "1/7", correct: false},
            {text: "9/14", correct: false},
        ]
    },
    {
        question: "Sự kiện nào được coi là sự kiện đánh dấu sự kết thúc của Chiến tranh lạnh?",
        answers: [
            {text: "Sự sụp đổ của bức tường Berlin (1989)", correct: false},
            {text: "Hiệp ước START I (1991)", correct: false},
            {text: "Hội nghị thượng đỉnh Malta (1989)", correct: false},
            {text: "Sự tan rã của Liên Xô (1991)", correct: true},
        ]
    },
    {
        question: "Phát biểu nào dưới đây KHÔNG ĐÚNG về Hệ điều hành?",
        answers: [
            {text: "Hệ điều hành quản lý các phần cứng máy tính.", correct: false},
            {text: "Hệ điều hành hỗ trợ phần mềm giao tiếp phần cứng trên máy tính.", correct: false},
            {text: "Hệ điều hành hỗ trợ người dùng điều hành máy tính.", correct: false},
            {text: "Hệ điều hành trực tiếp điều khiển hoạt động cho từng thiết bị phần cứng.", correct: true},
        ]
    },
    {
        question: "Bộ phim chiếu rạp có doanh thu cao nhất thế giới tính đến thời điểm hiện tại là gì?",
        answers: [
            {text: "Avatar: The Way of Water", correct: false},
            {text: "Avengers: Endgame", correct: false},
            {text: "Titanic", correct: false},
            {text: "Avatar (2009)", correct: true},
        ]
    },
    {
        question: "Cuốn sách bán chạy nhất thế giới?",
        answers: [
            {text: "Kinh Thánh (The Bible)", correct: true},
            {text: "Don Quixote", correct: false},
            {text: "Mao chủ tịch ngữ lục", correct: false},
            {text: "Chúa tể của những chiếc nhẫn", correct: false},
        ]
    },
    {
        question: "Tựa game nào sau đây đoạt từng đạt giải thưởng cao nhất tại sự kiện The Game Award",
        answers: [
            {text: "Red Dead Redemption 2", correct: false},
            {text: "Ghost Of Tsushima", correct: false},
            {text: "Uncharted 4: A Thief End", correct: false},
            {text: "God Of War 2018", correct: true},
        ]
    },
    {
        question: "Từ nào sau đây bị mắc lỗi chính tả",
        answers: [
            {text: "Entrepreneur", correct: false},
            {text: "Thorough", correct: false},
            {text: "Bibliography", correct: false},
            {text: "Questionaire", correct: true},
        ]
    },
    {
        question: "Hãy cho biết tư tưởng nào sau đây nói về của giải thuật tìm kiếm nhị phân?",
        answers: [
            {text: "Lần lượt chia dãy thành 2 dãy con dựa vào phần tử khóa, sau đó thực hiện việc tìm kiếm trên hai đoạn đã chia", correct: false},
            {text: "So sánh X lần lượt với các phần tử thứ nhất, thứ hai,... của dãy đến khi gặp phần tử có khóa cần tìm", correct: false},
            {text: "Tìm kiếm dựa vào cây nhị phân tìm kiếm", correct: false},
            {text: "Tại mỗi bước tiến hành so sánh X với phần tử ở giữa của dãy, dựa vào bước so sánh này quyết định giới hạn dãy tìm kiếm nằm ở nữa trên hay nửa dưới của dãy hiện hành", correct: true},
        ]
    },
];

const questionElement = document.querySelector(".question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next");
const retryButton = document.querySelector(".retry");

let currentQuestionIndex = 0;

function shuffleArray(array) {  
    for (let i = array.length - 1; i > 0; i--) {  
      const j = Math.floor(Math.random() * (i + 1));  
      [array[i], array[j]] = [array[j], array[i]];  
    }  
    return array;  
  } 

function startQuiz(){
    currentQuestionIndex = 0;
    shuffleArray(questions);
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = "Câu " + questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.sort(()=> Math.random() > 0.5 ? 1 : -1);
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    retryButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        if(currentQuestionIndex == questions.length - 1){
            document.querySelector(".continue-container").style.display = "block";
            selectedBtn.classList.add("correct");
            nextButton.style.display = "none";
            retryButton.style.display = "none";
        }
        else{
            selectedBtn.classList.add("correct");
            nextButton.style.display = "block";
            retryButton.style.display = "none";
        }
    }
    else{
        selectedBtn.classList.add("incorrect");
        nextButton.style.display = "none";
        retryButton.style.display = "block";
    }
    Array.from(answerButton.children).forEach(button =>{
        button.disabled = true;
    })
}

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++;
    showQuestion();
});

retryButton.addEventListener("click", startQuiz);

startQuiz();

console.log(questions.length);