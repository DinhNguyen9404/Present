let actionAllowed = true;

document.addEventListener('keydown', async(e)=>{
    e.preventDefault();
    if(actionAllowed && (e.key == 'ArrowLeft' || e.key== 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowRight')){
        let movement = false;
        actionAllowed = false;
        if(e.key == 'ArrowLeft' && !e.repeat){
            for(let i = 0; i<= 504; i+=126){
                let state = ['free', 'free', 'free', 'free', 'free'];
                for(let j = 0; j<= 504; j+=126){
                    boxes().forEach((box_A)=>{
                        if(Y(box_A)==i && X(box_A) ==j){
                            let index = (state.indexOf('occupied') == -1) ? state.indexOf('free') : state.indexOf('occupied');
                            let tempX = X(box_A);
                            if(index == state.indexOf('free')){
                                box_A.style.marginLeft = `${index*126}px`;
                                state[index] = 'occupied';
                            }
                            else if(index== state.indexOf('occupied')){
                                let occupiedBox = boxes().find(box_B => (X(box_B) == index*126 && Y(box_B) == i));
                                if(occupiedBox.innerHTML==box_A.innerHTML){
                                    box_A.style.marginLeft = `${index*126}px`;
                                    state[index] = 'blocked';
                                }
                                else{
                                    box_A.style.marginLeft = `${(index+1)*126}px`;
                                    state[index] = 'blocked';
                                    state[index+1] = 'occupied';
                                }
                            }
                            if(X(box_A)!=tempX){
                                movement = true;
                            }
                        }
                    })
                }
            }
        }
        else if(e.key == 'ArrowRight' && !e.repeat){
            for(let i = 0; i<= 504; i+=126){
                let state = ['free', 'free', 'free', 'free', 'free'];
                for(let j = 504; j>= 0; j-=126){
                    boxes().forEach((box_A)=>{
                        if(Y(box_A)==i && X(box_A) ==j){
                            let index = (state.lastIndexOf('occupied') == -1) ? state.lastIndexOf('free') : state.lastIndexOf('occupied');
                            let tempX = X(box_A);
                            if(index == state.lastIndexOf('free')){
                                box_A.style.marginLeft = `${index*126}px`;
                                state[index] = 'occupied';
                            }
                            else if(index== state.lastIndexOf('occupied')){
                                let occupiedBox = boxes().find(box_B => (X(box_B) == index*126 && Y(box_B) == i));
                                if(occupiedBox.innerHTML==box_A.innerHTML){
                                    box_A.style.marginLeft = `${index*126}px`;
                                    state[index] = 'blocked';
                                }
                                else{
                                    box_A.style.marginLeft = `${(index-1)*126}px`;
                                    state[index] = 'blocked';
                                    state[index-1] = 'occupied';
                                }
                            }
                            if(X(box_A)!=tempX){
                                movement = true;
                            }
                        }
                    })
                }
            }
        }
        else if(e.key == 'ArrowUp' && !e.repeat){
            for(let i = 0; i<= 504; i+=126){
                let state = ['free', 'free', 'free', 'free', 'free'];
                for(let j = 0; j<= 504; j+=126){
                    boxes().forEach((box_A)=>{
                        if(X(box_A)==i && Y(box_A) ==j){
                            let index = (state.indexOf('occupied') == -1) ? state.indexOf('free') : state.indexOf('occupied');
                            let tempY = Y(box_A);
                            if(index == state.indexOf('free')){
                                box_A.style.marginTop = `${index*126}px`;
                                state[index] = 'occupied';
                            }
                            else if(index== state.indexOf('occupied')){
                                let occupiedBox = boxes().find(box_B => (Y(box_B) == index*126 && X(box_B) == i));
                                if(occupiedBox.innerHTML==box_A.innerHTML){
                                    box_A.style.marginTop = `${index*126}px`;
                                    state[index] = 'blocked';
                                }
                                else{
                                    box_A.style.marginTop = `${(index+1)*126}px`;
                                    state[index] = 'blocked';
                                    state[index+1] = 'occupied';
                                }
                            }
                            if(Y(box_A)!=tempY){
                                movement = true;
                            }
                        }
                    })
                }
            }
        }
        else if(e.key == 'ArrowDown' && !e.repeat){
            for(let i = 0; i<= 504; i+=126){
                let state = ['free', 'free', 'free', 'free', 'free'];
                for(let j = 504; j>= 0; j-=126){
                    boxes().forEach((box_A)=>{
                        if(X(box_A)==i && Y(box_A) ==j){
                            let index = (state.lastIndexOf('occupied') == -1) ? state.lastIndexOf('free') : state.lastIndexOf('occupied');
                            let tempY = Y(box_A);
                            if(index == state.lastIndexOf('free')){
                                box_A.style.marginTop = `${index*126}px`;
                                state[index] = 'occupied';
                            }
                            else if(index== state.lastIndexOf('occupied')){
                                let occupiedBox = boxes().find(box_B => (Y(box_B) == index*126 && X(box_B) == i));
                                if(occupiedBox.innerHTML==box_A.innerHTML){
                                    box_A.style.marginTop = `${index*126}px`;
                                    state[index] = 'blocked';
                                }
                                else{
                                    box_A.style.marginTop = `${(index-1)*126}px`;
                                    state[index] = 'blocked';
                                    state[index-1] = 'occupied';
                                }
                            }
                            if(Y(box_A)!=tempY){
                                movement = true;
                            }
                        }
                    })
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 150));

        let duplicated = [];
        let toBeAnimated = [];
        for(let i = 0; i < boxes().length; i++){
            for(let j = 0; j< boxes().length; j++){
                if(i!=j && X(boxes()[i]) == X(boxes()[j]) && Y(boxes()[i]) == Y(boxes()[j])){
                    if(!duplicated.find(box => (X(box) == X(boxes()[i]) && Y(box) == Y(boxes()[i])))){
                        duplicated.push(boxes()[i]);
                        toBeAnimated.push(boxes()[j]);
                        boxes()[j].innerHTML = Number(boxes()[j].innerHTML)*2;
                        checkWin();
                    }
                }
            }
        }

        duplicated.forEach(box =>{
            box.remove();
        });

        let colors = [{color: '#00c6ff', value: 4}, 
            {color:'#ff0048', value:8}, 
            {color:'#00a06d', value:16}, 
            {color:'#dfb50d', value:32}, 
            {color:'#df002e', value:64}, 
            {color:'#440b56', value:128},
            {color:'#c67e1a', value:256},
            {color:'#b6260f', value:512},
            {color:'#21095e', value:1024},
            {color:'#ffd700', value:2048},
        ]
        toBeAnimated.forEach((box)=>{
            box.style.background = colors.find(object => object.value == box.innerHTML).color;
            box.style.transform = 'scale(1.125)';
        })
        await new Promise(resolve => setTimeout(resolve, 50));

        if(movement){
            generateBox();
        }

        toBeAnimated.forEach((box) =>{
            box.style.transform = 'scale(1)';
        });

        await new Promise(resolve => setTimeout(resolve, 50+(100-50)));
        actionAllowed = true;

        if(boxes().length == 25){
            let gameover = true;
            boxes().forEach((box_1)=>{
                let boxA = boxes().find(box_2 => (X(box_1) == X(box_2) && Y(box_1)-126==Y(box_2)));
                let boxB = boxes().find(box_2 => (X(box_1)+126 == X(box_2) && Y(box_1)==Y(box_2)));
                let boxC = boxes().find(box_2 => (X(box_1) == X(box_2) && Y(box_1)+126==Y(box_2)));
                let boxD = boxes().find(box_2 => (X(box_1)-126 == X(box_2) && Y(box_1)==Y(box_2)));

                if((boxA && boxA.innerHTML == box_1.innerHTML) || (boxB && boxB.innerHTML == box_1.innerHTML) || (boxC && boxC.innerHTML == box_1.innerHTML) || (boxD && boxD.innerHTML == box_1.innerHTML)){
                    gameover = false;
                }
            });

            if(gameover){
                setTimeout(()=>{
                    document.querySelector(".failed-container").style.display = "block";
                }, 1000);
            }
        }
    }
})

function boxes(){
    return Array.from(document.querySelectorAll(".box"));
}

function X(box){
    return Number(box.style.marginLeft.split('px')[0]);
}

function Y(box){
    return Number(box.style.marginTop.split('px')[0]);
}

function generateBox(){
    let values = [0, 126, 252, 378, 504];
    let randomValueX;
    let randomValueY;
    let boxValues = boxes().map(box => `${X(box)} ${Y(box)}`);
    do{
        randomValueX = values[Math.floor(Math.random()*values.length)];
        randomValueY = values[Math.floor(Math.random()*values.length)];
    }
    while(boxValues.includes(`${randomValueX} ${randomValueY}`));
    let style = `margin-left: ${randomValueX}px; margin-top: ${randomValueY}px; background: #b53471;`;
    document.querySelector(".game-board").insertAdjacentHTML('beforeend', `<div class='box' style='${style}'>2</div>`);

    boxes()[boxes().length-1].animate(
        [
            {clipPath: 'circle(0%)'},
            {clipPath: 'circle(100%)'}
        ],
        {
            duration: 100,
            easing: 'linear'
        }
    )
}

function checkWin(){
    boxes().forEach(box=>{
        if(box.innerHTML == 2048){
            console.log(box.innerHTML);
            setTimeout(() =>{
                document.querySelector(".continue-container").style.display = "block";
            }, 1000);
        }
    });
}

function startGame(){
    generateBox();
    generateBox();
}

startGame();

const restart = document.querySelector(".restart");
restart.addEventListener("click", ()=>{
    document.querySelector(".failed-container").style.display = "none";
    reset();
    startGame();
})

function reset(){
    boxes().forEach(box=>{
        box.remove();
    })
}

