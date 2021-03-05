let flashSequence = [];
let playerChoiceSequence = [];
let defaultSpeed = 2500;
let noise = true;
let buttonClicked = false;

const startBtn = document.getElementById('start-btn');
let progress = document.getElementById('progress');
let hiscore = document.getElementById('hi-score');
let newNumber = parseInt(progress.innerHTML, 10);
const greenCircle = document.getElementById('green');
const redCircle = document.getElementById('red');
const yellowCircle = document.getElementById('yellow');
const blueCircle = document.getElementById('blue');


// jQuery functions to fade the circles in and out five times to simulate a failure flash

const failureFlash =  () => {
  
    $(greenCircle).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1);
    $(redCircle).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1);
    $(yellowCircle).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1);
    $(blueCircle).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1).fadeTo(400, 0).fadeTo(400, 1);

};


// Adds event listener to the start button when the DOM is fully loaded
// Sets light to green and starts game after 3 seconds

$(document).ready(() => {
  startBtn.addEventListener('click', () => {
    document.getElementById('onoff').style.background = "#32CD32";
    setTimeout(() => {
      startGame();
    }, 3000)
  });
});


/* Resets array holding players choices and resets buttonClicked boolean to false
 Pushes a random number onto an array, a for loop then runs through this array calling sequencedFlash 
 to flash the circles in sequence. 
 Once the end of the array is reached the game and player choice 
 arrays are compared */

const startGame = () => {

  playerChoiceSequence = [];
  buttonClicked = false;

  flashSequence.push(Math.floor(Math.random() * 4) + 1 );

  for (let index = 0; index < flashSequence.length; index++) {

    sequencedFlash(index);
	
    if (index === flashSequence.length-1){

      setTimeout(checkPlayerSequence, defaultSpeed * index + 5000);
      
    }
  }
}


/* This method takes in the index of the iteration and flashes the circle matching the number */

const sequencedFlash = (index) => {

  setTimeout(() => {

    if (flashSequence[index] == 1) {
      const flash = () => {
        let audio = document.getElementById('clip1');
        $(greenCircle).fadeOut(500);
        audio.play();
        $(greenCircle).fadeIn(500);
      }
      setTimeout(flash, 500)
    }

    if (flashSequence[index] == 2) {
      const flash = () => {
        let audio = document.getElementById('clip2');
        $(redCircle).fadeOut(500);
        audio.play();
        $(redCircle).fadeIn(500);
      }
      setTimeout(flash, 500)
    }

    if (flashSequence[index] == 3) {
      const flash = () => {
        let audio = document.getElementById('clip3');
        $(yellowCircle).fadeOut(500);
        audio.play();
        $(yellowCircle).fadeIn(500);
      }
      setTimeout(flash, 500)
    }

    if (flashSequence[index] == 4) {
      const flash = () => {
        let audio = document.getElementById('clip4');
        $(blueCircle).fadeOut(500);
        audio.play();
        $(blueCircle).fadeIn(500);
      }
      setTimeout(flash, 500)
    }

  /* The speed here is multiplied by the number of iterations to ensure the flashes happen correctly */
    
  }, defaultSpeed * index);

}

    /* The follwing four event listeners push the corresponding number onto the playerChoice array
    Also changes the value of buttonClicked to be true so that it can be used to detect inactivity */
    
greenCircle.addEventListener('click', () => {
  let audio = document.getElementById('clip1');
  audio.play();
    playerChoiceSequence.push(1);
    buttonClicked = true;
  });


redCircle.addEventListener('click', () => {
    let audio = document.getElementById('clip2');
    audio.play();
    playerChoiceSequence.push(2);
    buttonClicked = true;
  });


yellowCircle.addEventListener('click', () => {
    let audio = document.getElementById('clip3');
    audio.play();
    playerChoiceSequence.push(3);
    buttonClicked = true;
  });

blueCircle.addEventListener('click', () => {
    let audio = document.getElementById('clip4');
    audio.play();
    playerChoiceSequence.push(4);
    buttonClicked = true;
  });




const checkPlayerSequence = () => {

/* Converts the array copntents to strings so they can be compared */
  
  let user = JSON.stringify(playerChoiceSequence);
  let ai = JSON.stringify(flashSequence);

  /* Checks if arrays are the same and a button has been clicked */ 
  if (user === ai && buttonClicked) {

    /** Increments progress counter */
    let overallHiScore = parseInt(hiscore.innerHTML, 10);
    progress.innerHTML = ++newNumber;

    /** Stores and updates hiscore accordingly */
    if ( newNumber > overallHiScore ) {
      hiscore.innerHTML = newNumber;
    }
    
     
    speedUp();

  } else {

    endGame();
    
  }
}

/** Checks what round the players on and resets the default speed accordingly */

const speedUp = () => {

  let first = 5;
  let sec = 9;
  let third = 13;
  let last = 20;

  if (newNumber >= first && newNumber < sec) {
    defaultSpeed = 1500;
  } else if (progress.innerHTML >= sec && progress.innerHTML < third) {
    defaultSpeed = 1000;
  } else if (progress.innerHTML >= third && progress.innerHTML < last) {
    defaultSpeed = 800;
  } else if (progress.innerHTML >= last) {
    defaultSpeed = 650;
  }
  
/** Start game funciton is called after three seconds have elapsed */
  
  setTimeout(startGame(), 3000);

}

/** The endGame function resets the necessary values, calls the failureFlash function and 
 * changes the light back to red */
const endGame = () => {

  progress.innerHTML = 0;
  newNumber = 0;
  flashSequence = [];
  defaultSpeed = 3000;
  failureFlash();
  document.getElementById('onoff').style.background = "rgb(201, 33, 3)";

}


