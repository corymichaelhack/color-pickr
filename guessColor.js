// DATA BASE MODEL
//Store all colors in an array
let colors = [
    {
        color: 'red',
        rgbCode: "rgb(255, 0, 0)"

    }, 
    {
        color: 'green',
        rgbCode: "rgb(0, 255, 0)"

    },
    {
        color: 'blue',
        rgbCode: "rgb(0, 0, 255)"

    },
    {
        color: 'purple',
        rgbCode: "rgb(255, 0, 255)"

    },
    {
        color: 'orange',
        rgbCode: "rgb(255, 128, 0)"

    },
    {
        color: 'yellow',
        rgbCode: "rgb(255, 255, 0)"

    }
];

let colorsArray;

let squares;
let answerSquare = document.querySelector('#answerSquare');
let answerText = document.querySelector('#answerText');
let resetBtn = document.querySelector('#reset');
let sixBtn = document.querySelector('#six-cards');
let threeBtn = document.querySelector('#three-cards');
let colorContainer = document.querySelector('#color-container');
let modes = document.querySelectorAll('.mode');
let squareNum = 3;


// Audio
let cheers = document.querySelector('#cheersAudio');
let sadSound = document.querySelector('#sadAudio');



//VIEW

//diplay colors from new array to html
// let squares = document.querySelectorAll('.square');
// squares[0].style.backgroundColor = "red";



//CONTROLLER

function onModeClick(){
    for (let i = 0; i < modes.length; i++){
        modes[i].addEventListener('click', setCardNumber)
    }   
}



function setCardNumber(){
    if (this.getAttribute("id") == "three"){
        squareNum = 3
    } else {
        squareNum = 6
    }
  reset();
}



function collectAllSquares(){
    squares = document.querySelectorAll('.square');
}


function displayNumberOfCards(){
    for (let i = 0; i < squareNum; i++){
        let square = document.createElement('div');
        colorContainer.appendChild(square);
    square.setAttribute('class','square');
    }
    collectAllSquares();
}





// get all colors from database by random into a new array
function generateRandomColorArray(){
    colorsArray = [];
    let loggedNumber = [];

    while ( colorsArray.length < colors.length ){
        //generate a random number
        let randomNumber = Math.floor(Math.random() * colors.length)

        while ( !loggedNumber.includes(randomNumber)){
            loggedNumber.push(randomNumber)
        //slice a random color from the colors object array and push to new array
        getRandomColor = colors.slice(randomNumber, randomNumber + 1)
        
        //push random color to colorsArray
        colorsArray.push(getRandomColor)
        }  
    }
    colorsArray = colorsArray.flat();
    return colorsArray; 
}

function styleSquareColors(){
    for ( i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colorsArray[i].color;
    }
}

function onSquareClick(){
    for (let i = 0; i < squares.length; i++){
        squares[i].addEventListener('click', isCorrect)
    }
}

function isCorrect(){
    let clickedColor = this.style.backgroundColor;
    if (clickedColor == answerSquare.style.backgroundColor){
        playCheersAudio()
        setTimeout(function(){alert("You are correct!");},1000);
        reset();
    } else {
        playSadAudio()
        setTimeout(function(){alert("That is not correct. Try again.");},1000);
    }   
}

function correctColor(){
    let randomNumber = Math.floor(Math.random() * squareNum);
    answerSquare.style.backgroundColor = colorsArray[randomNumber].color;
    answerText.innerHTML = colorsArray[randomNumber].color;
    answerText.style.color = colorsArray[randomNumber].color;
}

function playCheersAudio(){
    cheers.play();  
}

function playSadAudio(){
    sadSound.play();  
}

//display answerColor

function reset(){
    
    colorContainer.querySelectorAll('.square').forEach(n => n.remove());
    generateRandomColorArray();
    displayNumberOfCards()
    collectAllSquares()
    styleSquareColors();
    onSquareClick();
    correctColor();
}

resetBtn.addEventListener('click', reset);



onModeClick();
displayNumberOfCards()
generateRandomColorArray();
styleSquareColors();
onSquareClick();
correctColor();