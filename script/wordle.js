const dictionary = ['earth', 'plane', 'crane', 'audio', 'house','stern', 'great','human','death', 'month', 'chain', 'brain', 'empty', 'wrong', 'cheat'];
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6).fill().map(() => Array(5).fill('')),
    //hàm map() sẽ thực hiện hàm mũi tên này cho mỗi phần tử trong mảng ban đầu (6 phần tử undefined), 
    //kết quả cuối cùng sẽ là một mảng có 6 phần tử, mỗi phần tử là một mảng gồm 5 phần tử chuỗi rỗng.
    currentRow: 0,
    currentCol: 0,
};
const game = document.getElementById("game");
const next = document.querySelector('.next');
const reset = document.querySelector('.reset');
const score = document.querySelector('.score');
const result = document.querySelector(".result");
const winResult = ['Excellent', 'Good job', 'Easy, right?', 'Damn!'];
let currScore = 0;
let keyEnable = true;

function updateGrid(){
    for(let i = 0; i < state.grid.length; i++){
        for(let j = 0; j < state.grid[i].length; j++){
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = ''){
    const box = document.createElement("div");
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    container.appendChild(box);
    box;
}

function drawGrid(container){
    const grid = document.createElement("div");
    grid.className = 'grid';
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 5; j++){
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}

function clearGrid(container){
    const clear = container.querySelector(".grid");
    if(clear === null) return;
    while(clear.firstChild){
        clear.removeChild(clear.firstChild);
        //Xoa tung dua con cua grid
    }
    container.removeChild(clear);
    //Xoa chinh cai grid do
}

function registerKeyboardEvents(){
    document.body.onkeydown = (e) =>{
        if(keyEnable){
            const key = e.key;
            if(key === 'Enter'){
                if(state.currentCol === 5){
                    keyEnable = false;
                    const word = getCurrentWord();
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                }
            }
            if(key === 'Backspace'){
                removeLetter();
            }
            if(isLetter(key)){
                addLetter(key);
            }
            updateGrid();
        }
    };
}

function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function revealWord(guess){
    const row = state.currentRow;
    const animation_duration = 500; //ms

    for(let i = 0; i < 5; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() =>{
            if(letter === state.secret[i]){
                box.classList.add("right");
            }
            else if(state.secret.includes(letter)){
                box.classList.add("wrong");
            }
            else{
                box.classList.add("empty");
            }
        },((i+1) * animation_duration) / 2);

        box.classList.add("animated");
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    if(isWinner){
        currScore++;
        if(currScore === 3){
            result.textContent = "Congratulation!";
            score.style.color = "gold";
            setTimeout(()=>{
                document.querySelector(".continue-container").style.display = "block";
            }, 2000);
        }    
        else{
            next.style.display = "block";
            result.textContent = winResult[Math.floor(Math.random()* winResult.length)];
        }
        result.style.display = "block";
        score.textContent = `${currScore}/3`;
    }
    else if(isGameOver){
        result.textContent = "Too bad";
        result.style.display = "block";
        reset.style.display = "block";
    }
    else{
        keyEnable = true;
    }
}

function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter){
    if(state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter(){
    if(state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol -1] = '';
    state.currentCol--; 
}

function startup(){
    clearGrid(game);
    console.log(state.secret);
    next.style.display = "none";
    reset.style.display = "none";
    result.style.display = "none";
    drawGrid(game);
    registerKeyboardEvents();
}

startup();

next.addEventListener("click", ()=>{
    keyEnable = true;
    state.grid = Array(6).fill().map(() => Array(5).fill(''));
    state.secret = dictionary[Math.floor(Math.random() * dictionary.length)];
    state.currentCol = 0;
    state.currentRow = 0;
    startup();
    console.log(currScore);
})

reset.addEventListener("click", ()=>{
    keyEnable = true;
    state.grid = Array(6).fill().map(() => Array(5).fill(''));
    state.secret = dictionary[Math.floor(Math.random() * dictionary.length)];
    state.currentCol = 0;
    state.currentRow = 0;
    currScore = 0;
    score.textContent = `${currScore}/3`;
    startup();
})