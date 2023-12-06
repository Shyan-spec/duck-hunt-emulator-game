/*-------------------------------- Constants --------------------------------*/
const countDownTimer = 1;
const perSet = 4;
const grid = 18;
resetShots = 5;


/*---------------------------- Variables (state) ----------------------------*/
let pixelEls = []
let start;
let score;
let shotsLeft;
let timer;
let timeLeft;
let pixelsAreLeft;
let countDownInterval;
let localCountDownInterval;

/*------------------------ Cached Element References ------------------------*/

const timerMessage = document.querySelector("#timer");
const scoreMessage = document.querySelector("#score");
const gameOverMessage = document.querySelector("#game-over");
const shotsLeftMessage = document.querySelector("#shots");
const playButton = document.querySelector("#start-reset");
const startcountDownElement = document.getElementById("countdown");
const squareEl = document.querySelector(".Play-space");
const childElements = squareEl.querySelectorAll("*");
//rename code
//color them
// rdaomize them
//const countTimerElement = document.getElementById('timer')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  start = true;
  score = 0;
  shotsLeft = 5;
  timer = 15;
  gameOverMessage.textContent = ''
  console.log(pixelEls)
  render();
  
};


const updateMessage = () => {
  timerMessage.textContent = `TIME: ${timer}`;
  scoreMessage.textContent = `SCORE: ${score}`;
  shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
};

const startGame = () => {
  let countdown = countDownTimer;

  startcountDownElement.textContent = countdown;

   countDownInterval = setInterval(() => {
    countdown--;

    startcountDownElement.textContent = countdown;
    console.log(countdown)

    if (countdown === 0) {
      init();
      trackTime();

      clearInterval(countDownInterval);
      startcountDownElement.textContent = "";
    }
  }, 1000);
};

const trackScore = () => {

      score += 100 
      scoreMessage.textContent = `SCORE: ${score}`;
};

const trackTime = () => {
   timeLeft = timer;

  timerMessage.textContent = `TIME: ${timeLeft}`;

   localCountDownInterval = setInterval(() => {
    timeLeft--;

    timerMessage.textContent = `TIME: ${timeLeft}`;
    console.log(timeLeft)
    console.log(pixelEls)

    if (timeLeft > 0 && timeLeft % 7 === 0 && pixelEls.length > 0) {
      pixelEls.length = 0
      squareEl.innerHTML = '';
      updateBoard();
    }
    

    if (timeLeft === 0) {
      clearInterval(localCountDownInterval);
      gameOver()
      
    }
  }, 1000);
};

const trackShotsLeft = (pixel) => {
  
  squareEl.removeChild(pixelEls[pixel]);
  pixelEls[pixel] = null;
  trackScore();

  const arrayContainsNonNull = pixelEls.every((element) => element === null);

  if (arrayContainsNonNull) {
    pixelEls.length = 0;
    updateBoard();

    shotsLeft = resetShots + 1;
  }

};



const updateBoard = () => {


  for (let i = 0; i < perSet; i++) {
    const gridContainer = document.querySelector('.grid');
    const duck = document.createElement('div');
    duck.classList.add(`duck-${i}`);
    document.querySelector('.Play-space').appendChild(duck);
    pixelEls.push(duck)
    
    const startX = Math.floor(Math.random() * (gridContainer.clientWidth - duck.clientWidth));
    const startY = 0;
    
    
    duck.style.left = `${startX}px`;
    duck.style.bottom = `${startY}px`;

    animateDuck(duck);
   
  }

  addDuckEventListeners(); 
  return pixelEls
  
};

const addDuckEventListeners = () => {
  pixelEls.forEach((duck, i) => {
    duck.addEventListener("click", () => {
      trackShotsLeft(i);
    });
  });
};

const minusShots = () => {

  shotsLeft -= 1

};

const render = () => {
  updateMessage();
  updateBoard();
  
};


const gameOver = () => { 
  clearInterval(countDownInterval)
  start = false;
  timerMessage.textContent = ``;
  scoreMessage.textContent = ``;
  shotsLeftMessage.textContent = ``;
  console.log(score)

  if(shotsLeft === 0){
    
    gameOverMessage.textContent = `Game Over! \n Out of Shots, your score is ${score} `
    

    squareEl.innerHTML = '';
    pixelEls = []
    document.body.append(playButton)
  }
  else if(timeLeft === 0){
    gameOverMessage.textContent = `Game Over! \n Out of Time, your score is ${score} `

    squareEl.innerHTML = '';
    pixelEls = []
   
    document.body.append(playButton)
    
  }
  

}



/*----------------------------- Event Listeners -----------------------------*/

playButton.addEventListener("click", startGame);

playButton.addEventListener("click", playButton.remove);
  


squareEl.addEventListener("click", (e) => {

  if(start && shotsLeft > 0 ){
  const clickedPixel = pixelEls.includes(element => element.id === e.target.id);

  if (clickedPixel) {
    minusShots()
    console.log(shotsLeft);
    shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
      trackShotsLeft(clickedPixel);
  } else {
      minusShots()
      console.log(shotsLeft);
      shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
      
  }

  if(shotsLeft === 0){
    clearInterval(localCountDownInterval);
    gameOver()
  }
}
  

})


function animateDuck(duck) {
  let endY = 0;
    const gridContainer = document.querySelector('.grid');
    const duckWidth = duck.clientWidth;

    duck.style.transition = 'bottom 1s linear';

    const intervalIdX = setInterval(() => {
        let endX = Math.floor(Math.random() * (gridContainer.clientWidth - duckWidth));

        duck.style.left = `${endX}px`;
        

        if (endY >= 562) {
            // Duck has reached the top, you can remove it or handle scoring here
           
            clearInterval(intervalIdX); // Stop the interval
            duck.remove();
        }
    }, 1050); // Update every 1000 milliseconds
      
    //TODO : Just move them below so when they come out they are divided

    const intervalIdY = setInterval(() => {
      duck.style.transition = 'left 1s linear';
      let increment = Math.floor(Math.random() * 3); // Random increment between 0 and 2

        if (increment <= 1) {
            endY += 21; // Increment endY by 5 if the random value is 0 or 1 (up)
        } else {
            endY -= 10; // Decrement endY by 5 if the random value is 2 (down)
        }
      duck.style.bottom = `${endY}px`;

      if (endY >= 562) {
          // Duck has reached the top, you can remove it or handle scoring here
          
          clearInterval(intervalIdY); // Stop the interval
          duck.remove();
      }
  }, 90); // Update every 1000 milliseconds
}



