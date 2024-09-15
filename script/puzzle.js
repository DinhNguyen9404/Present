let rows = 6;
let cols = 6;

let currTile;
let otherTile;

let turns = 0;

window.onload = function(){
    //initialize the 6x6 board
    for(let i = 0; i<rows; i++){
        for(let j = 0; j < cols; j++){
            let tile = document.createElement("img");
            tile.src = `../Images/Puzzle/blank.png`;
            //Drag and drop functionality
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver); //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop); //drop an image onto another one
            tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

            document.querySelector(".board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for(let i = 1; i <= rows*cols; i++){
        pieces.push(i.toString()); //put 1 to 36 into the array (puzzle images names)
    }

    pieces.reverse();
    for(let i = 0; i < pieces.length; i++){
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for(let i = 0; i < pieces.length; i++){
        let tile = document.createElement('img');
        tile.src = "../Images/Puzzle/" + pieces[i] + ".png";

        //Drag and drop functionality
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver); //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop); //drop an image onto another one
        tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

        document.querySelector(".pieces").append(tile); 
    }
}

//Drag Items
function dragStart(){
    currTile = this;  //this refers to image that was clicked on for dragging
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
}

function dragDrop(){
    otherTile = this;  //this refers to image that is being dragged on
}

function dragEnd(){
    if(currTile.src.includes("blank")){
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.querySelector(".turns").innerText = turns;
    check();
}

function check(){
    const board = document.querySelector(".board");
    const images = board.querySelectorAll("img");
    let checknum = 0;
    images.forEach((image, index) =>{
        console.log(image.src);
        if(image.src.includes(`/Puzzle/${index+1}`)){
            checknum++;
            console.log(checknum);
            if(checknum === 36){
                setTimeout(()=>{
                    document.querySelector(".continue-container").style.display = "block";
                }, 500);   
            }
        }
    })
}