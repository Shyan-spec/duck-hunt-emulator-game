/*-------------------------------- Constants --------------------------------*/
const countDownTimer = 3;
const perSet = 3;
const grid = 18;

/*---------------------------- Variables (state) ----------------------------*/

let start;
let score;
let shotsLeft;
let timer;
let pixelsAreLeft;

/*------------------------ Cached Element References ------------------------*/

const timerMessage = document.querySelector("#timer");
const scoreMessage = document.querySelector("#score");
const gameOverMessage = document.querySelector("#game-over");
const shotsLeftMessage = document.querySelector("#shots");
const playButton = document.querySelector("#start-reset");
const startcountDownElement = document.getElementById("countdown");
const squareEl = document.querySelector(".Play-space");
let pixelEl;
//create based off of perset
//color them
// rdaomize them
//const countTimerElement = document.getElementById('timer')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  start = false;
  score = 0;
  shotsLeft = 5;
  timer = 30;

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

  const countDownInterval = setInterval(() => {
    countdown--;

    startcountDownElement.textContent = countdown;

    if (countdown === 0) {
      init();

      trackTime();

      clearInterval(countDownInterval);
      startcountDownElement.textContent = "";
    }
  }, 1000);
};

const trackScore = () => {};

const trackTime = () => {
  let timeLeft = timer;

  timerMessage.textContent = `TIME: ${timeLeft}`;

  const countDownInterval = setInterval(() => {
    timeLeft--;

    timerMessage.textContent = `TIME: ${timeLeft}`;

    if (timeLeft === 0) {
      //do something
      clearInterval(countDownInterval);
    }
  }, 1000);
};

const trackShotsLeft = () => {};

const updateBoard = () => {
  for (let i = 0; i < perSet; i++) {
    pixelEl = document.createElement("div");

    const randomRow = Math.floor(Math.random() * grid + 1);
    const randomColumn = Math.floor(Math.random() * grid + 1);

    pixelEl.style.gridArea = `${randomRow} / ${randomColumn}`;
    pixelEl.style.backgroundColor = "black";

    squareEl.appendChild(pixelEl);

    pixelEl.addEventListener("click", () => {
        console.log(pixelEl);
      });

      console.log(pixelEl)
  }

  

  
};

const trackSets = () => {};

const render = () => {
  updateMessage();
  updateBoard();
  trackShotsLeft();
};

init();

/*----------------------------- Event Listeners -----------------------------*/

playButton.addEventListener("click", startGame);

