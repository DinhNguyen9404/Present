const wordText = document.querySelector(".word"),
hint = document.querySelector(".hint");
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
checkBtn = document.querySelector(".check-word");
contentBox = document.querySelector(".container .content");
startArea = document.querySelector(".startArea");
scoreArea = document.querySelector(".score");
review = document.querySelector(".review");
const restart = document.querySelector(".restart");
const next = document.querySelector(".next");
const hintBtn = document.querySelector(".hintBtn");

let enableInput = true;
let correctWord, timer;
let score = 0; 
let startTime = 40;
let hintCnt = 3;

function shuffleArray(array) {  
    for (let i = array.length - 1; i > 0; i--) {  
      const j = Math.floor(Math.random() * (i + 1));  
      [array[i], array[j]] = [array[j], array[i]];  
    }  
    return array;  
} 


function startTimer(){
    timerInterval = setInterval(() =>{
        startTime--;
        timeText.textContent = startTime + "s";
        if(startTime <= 0){
            stopTimer();
            checkBtn.disabled = true;
            enableInput = false;
            document.querySelector(".failed-container").style.display = "block";
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}

let cnt;

const start = () => {
    contentBox.style.display = "flex";
    startArea.style.display = "none";
    shuffleArray(words);
    cnt = 0; 
    initGame();
}


const initGame = () => {
    startTimer();
    hintBtn.disabled = false;
    hint.style.display = "none";
    let randomObj = words[cnt];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreArea.innerHTML = `${score}/8`;
}

inputField.onfocus = ()=>{
    if(!enableInput){
        inputField.blur();
    }
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    console.log(userWord);

    if(userWord == '') { 
        review.innerHTML = "Nhập đáp án dùm!";
    }
    else if(userWord !== correctWord) { 
        return review.innerHTML = Math.random() > 0.5 ? "Sai rồi" : "Trật lất";
    }
    else
    {
        stopTimer();
        enableInput = false;
        checkBtn.disabled = true;
        hintBtn.disabled = true;
        review.innerHTML = Math.random() > 0.5 ? "Awesome!" : "Correct!";
        score++;
        scoreArea.innerHTML = `${score}/8`;
        if(score == 8){
            setTimeout(()=>{
                document.querySelector(".continue-container").style.display = "block";
            }, 1000);
            return;
        }
        next.style.display = "block";
    }
}


checkBtn.addEventListener("click", checkWord);

restart.addEventListener("click", ()=>{
    review.innerHTML = '';
    document.querySelector(".failed-container").style.display = "none";
    checkBtn.disabled = false;
    enableInput = true;
    clearInterval(timer);
    score = 0;
    startTime = 40;
    timeText.textContent = startTime + "s"
    cnt = 0;
    shuffleArray(words);
    initGame();
})

next.addEventListener("click", ()=>{
    review.innerHTML = '';
    next.style.display = "none";
    checkBtn.disabled = false;
    enableInput = true;
    startTime = 40;
    timeText.textContent = startTime + "s"
    cnt++;
    initGame();
})

hintBtn.addEventListener("click", ()=>{
    if(hintCnt >= 1){
        hintBtn.disabled = true;
        hintCnt --;
        hint.style.display = "block";
    }
    else{
        review.innerHTML = "Hết lượt nhận gợi ý rồi!";
        hintBtn.disabled = true;
        setTimeout(() =>{
            review.innerHTML = '';
        },2000)
    }    
})

