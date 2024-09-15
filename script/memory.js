const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disableDeck = true; 
//prevent user click other cards until the first two cards unflip
let matchedCard = 0;
//Timer
let startTime = 90;
let timerInterval;
let timer = document.querySelector(".timer");
//Message
const Failed = document.querySelector(".failed-container");
const Continue = document.querySelector(".continue-container")
const Start = document.querySelector(".start-game");
const Refresh = document.querySelector(".refresh");

Start.addEventListener("click", ()=>{
    disableDeck = false;
    startTimer();
    Start.style = "display : none";
})

Refresh.addEventListener("click", ()=>{
    Start.style = "display : block";
    startTime = 90;
    timer.textContent = startTime + "s";
    stopTimer();
    shuffleCard();
})

function startTimer(){
    timerInterval = setInterval(() =>{
        startTime--;
        timer.textContent = startTime + "s";
        if(startTime <= 0){
            stopTimer();
            Failed.style = "display: block";
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}



function flipCard(e) {
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            //Neu cardOne khong co gia tri thi gan vo
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){
    if(img1 === img2){
        matchedCard++;
        if(matchedCard == 12){
            stopTimer();
            Continue.style = "display: block";
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() =>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400)
    
    setTimeout(() =>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";  //setting both card value to blank
        disableDeck = false;
    }, 800)
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    arr.sort(() => Math.random() > 0.5 ? 1: -1);
    cards.forEach((card, index) =>{
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `./Images/MemoryCard/${arr[index]}.webp`;
        card.addEventListener("click", flipCard);
    })
}

shuffleCard();

cards.forEach(card =>{
    card.addEventListener("click", flipCard);
})

