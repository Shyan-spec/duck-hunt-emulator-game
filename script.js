/*-------------------------------- Constants --------------------------------*/
const countDownTimer = 3;
const perSet = 3;
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

    if (timeLeft > 0 && timeLeft % 3 === 0 && pixelEls.length > 0) {
      pixelEls.length = 0
      squareEl.innerHTML = '';
      updateBoard();
    }
    else{
      console.log("here")
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
   const pixelEl = document.createElement("div");

    const randomRow = Math.floor(Math.random() * grid + 1);
    const randomColumn = Math.floor(Math.random() * grid + 1);

    pixelEl.style.gridArea = `${randomRow} / ${randomColumn}`;
    pixelEl.style.backgroundColor = "black";
    
    pixelEl.id = `sq-${i}`

    squareEl.appendChild(pixelEl);
    pixelEls.push(pixelEl)

    pixelEl.addEventListener("click", () => {
        trackShotsLeft(i)
      });

      
  }

  
  return pixelEls
  
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

