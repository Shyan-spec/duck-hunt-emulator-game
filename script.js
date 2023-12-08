/*-------------------------------- Constants --------------------------------*/
const countDownTimer = 3;
const perSet = 4;
const grid = 18;
resetShots = 25;
let add = 0
let soundPlayed = false;
let title = true;

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
const squareEl = document.querySelector(".Play-space");
const childElements = squareEl.querySelectorAll("*");
const gridContainer = document.querySelector('.grid');
const emptySpace = document.querySelector(".empty-space")
const startcountDownElement = document.getElementById("countdown");
const titleText = document.getElementById("main-title")
const windSound = new Audio("assets/wind-howling-softly-in-vast-space-smartsound-fx-1-01-34.mp3")
const duckSound = new Audio("assets/ducks-quacking-flapping-wings-smartsound-fx-1-00-04.mp3")
const fireSound = new Audio("assets/gunshot-bolt-action-rifle-fascinatedsound-3-3-00-03.mp3")
windSound.loop = true;
duckSound.loop = true;
//rename code
//color them
// rdaomize them
//const countTimerElement = document.getElementById('timer')

/*-------------------------------- Functions --------------------------------*/

  document.addEventListener("mousemove", () => {
    if (!soundPlayed) {
      windSound.play();
      
      soundPlayed = true;
    }
  }
  )




const init = () => {
  title = true;
  start = true;
  score = 0;
  shotsLeft = 25;
  timer = 30;
  gameOverMessage.textContent = ''
  render();

};


const updateMessage = () => {
  timerMessage.textContent = `TIME: ${timer}`;
  scoreMessage.textContent = `SCORE: ${score}`;
  shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
};

const startGame = () => {
  if(title) {
    gridContainer.removeChild(titleText)
    title = false;
    
  }
  let countdown = countDownTimer;

  const startcountDownElement = document.createElement('div');
  startcountDownElement.id = 'countdown'
  startcountDownElement.textContent = countdown;

  gridContainer.appendChild(startcountDownElement);

   countDownInterval = setInterval(() => {
    countdown--;
    
    startcountDownElement.textContent = countdown;
    

    if (countdown === 0) {
      gridContainer.removeChild(startcountDownElement);
      
      init();
      windSound.pause()
      duckSound.play()
      gridContainer.style.cursor =  `url("crosshair-removebg-preview.png") 64 64, crosshair`;
      trackTime();
      clearInterval(countDownInterval);
      startcountDownElement.textContent = "";
    }
  }, 1000);
};

const trackScore = (duck) => {

    if(JSON.parse(duck.dataset.duckInstance).breed === 'expert'){

      score += 500

    }
    else if(JSON.parse(duck.dataset.duckInstance).breed === 'advanced'){
      score += 200
    }
    else{
      score += 100
    }

      scoreMessage.textContent = `SCORE: ${score}`;
};

const trackTime = () => {
   timeLeft = timer;

  timerMessage.textContent = `TIME: ${timeLeft}`;

   localCountDownInterval = setInterval(() => {
    timeLeft--;

    timerMessage.textContent = `TIME: ${timeLeft}`;
    

    if (timeLeft > 0 && timeLeft % 10 === 0 && pixelEls.length > 0) {
      pixelEls.length = 0
      squareEl.innerHTML = '';
      updateBoard();
    }
    

    if (timeLeft === 0) {
      clearInterval(localCountDownInterval);
      gameOver()
      duckSound.pause()
    }
  }, 1000);
};

const addLives  = () => {
  add += 1
}

const trackShotsLeft = (clickedDuckIndex) => {
  
  fireSound.play()
  if(JSON.parse(pixelEls[clickedDuckIndex].dataset.duckInstance).lives === 2) {
    addLives()
    if(add === 2) {
      trackScore(pixelEls[clickedDuckIndex]);
      squareEl.removeChild(pixelEls[clickedDuckIndex]);
      pixelEls[clickedDuckIndex] = null;
      add = 0
    }
  }
  else{
    trackScore(pixelEls[clickedDuckIndex]);
    squareEl.removeChild(pixelEls[clickedDuckIndex]);
    pixelEls[clickedDuckIndex] = null;
    
  }
 


  const arrayContainsNonNull = pixelEls.every((element) => element === null);

  if (arrayContainsNonNull) {
    pixelEls.length = 0;
    updateBoard();

    shotsLeft = resetShots + 1;
  }

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
  title = true;
  start = false;
  timerMessage.textContent = ``;
  scoreMessage.textContent = ``;
  shotsLeftMessage.textContent = ``;
  

  if(shotsLeft === 0){
    
    gameOverMessage.textContent = `Out of Shots, your score is ${score} `
    playButton.textContent = "RESET"
    playButton.style.bottom = `-50px`;

    squareEl.innerHTML = '';
    pixelEls = []

    titleText.textContent = "GAME OVER"
    gridContainer.appendChild(titleText)

    gameOverMessage.style.position = 'relative';
    gameOverMessage.style.bottom = '136px';
    gameOverMessage.style.left = '146px';
    gameOverMessage.style.color = 'darkgreen';
    gridContainer.appendChild(gameOverMessage)

    playButton.style.left = '335px'
    playButton.style.top = '100px'
    document.body.append(playButton)
  }
  else if(timeLeft === 0){

    gameOverMessage.textContent = ` Out of Time, your score is ${score} `
    playButton.textContent = "RESET"
    playButton.style.bottom = `-50px`;
    squareEl.innerHTML = '';
    pixelEls = []
    titleText.textContent = "GAME OVER"

    gridContainer.appendChild(titleText)

    gameOverMessage.style.position = 'relative';
    gameOverMessage.style.bottom = '136px';
    gameOverMessage.style.left = '146px';
    gameOverMessage.style.color = 'black';
    emptySpace.appendChild(gameOverMessage)

    playButton.style.left = '335px'
    playButton.style.top = '100px'
    emptySpace.appendChild(playButton)
    
  }
  

}



/*----------------------------- Event Listeners -----------------------------*/

playButton.addEventListener("click", startGame);

playButton.addEventListener("click", playButton.remove);
  

//move parse outside global
squareEl.addEventListener("click", (e) => {
  if(start && shotsLeft > 0 ){
  const clickedPixel = pixelEls.includes(element => element.id === e.target.id);

  if (clickedPixel) {
    minusShots()
    
    
      
    
    shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
      trackShotsLeft(clickedPixel);
  } else {
      minusShots()
      
      shotsLeftMessage.textContent = `SHOTS: ${shotsLeft}`;
      
  }

  if(shotsLeft === 0){
    clearInterval(localCountDownInterval);
    gameOver()
  }
}
  

})


const addDuckEventListeners = () => {
  pixelEls.forEach((duck, i) => {
    duck.addEventListener("click", () => {
      trackShotsLeft(i);
    });
  });
};




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
    }, 800); // Update every 1000 milliseconds
      
    //TODO : Just move them below so when they come out they are divided

    const intervalIdY = setInterval(() => {
      
      duck.style.transition = 'left 1s linear';
      let increment = Math.floor(Math.random() * 3); // Random increment between 0 and 2

        if (increment <= 1) {
          const svgFileName = `duck-upstroke-${JSON.parse(duck.dataset.duckInstance).breed}.svg`;
          duck.style.background = `url('assets/${svgFileName}')`;
          duck.style.backgroundSize = 'contain';
          duck.style.backgroundRepeat = 'no-repeat'; 
          duck.style.transition = 'left 1s linear';
            endY += 20;
        } else {
          const svgFileName = `duck-downstroke-${JSON.parse(duck.dataset.duckInstance).breed}.svg`;
          duck.style.background = `url('assets/${svgFileName}')`;
          duck.style.backgroundSize = 'contain';
          duck.style.backgroundRepeat = 'no-repeat'; 
          duck.style.transition = 'left 1s linear';
            endY -= 10; // Decrement endY by 5 if the random value is 2 (down)
        }
      duck.style.bottom = `${endY}px`;

      if (endY >= 562) {
          // Duck has reached the top, you can remove it or handle scoring here
          
          clearInterval(intervalIdY); // Stop the interval
          duck.remove();
      }
  }, 150); // Update every 1000 milliseconds
}

const updateBoard = () => {
  

  for(let i = 0; i < perSet; i++) {
    const generateDucks = Math.floor(Math.random() * 4)
    let duck;

    if(generateDucks <= 1){
      duck = new BasicDuck()
      
    }
    else if(generateDucks === 2){
      duck = new AdvancedDuck()
      
    }
    else{
      duck = new ExpertDuck()
     
    }

    duck.spawn(i)
    
  }

   addDuckEventListeners(); 
  
  return pixelEls
  
};



class Duck {
  constructor(breed ,lives, color, size , points) {
    this.breed = breed;
    this.lives = lives;
    this.color = color;
    this.width = size;
    this.height = size;
    this.points = points;
    
  }


  spawn(i) {
    const gridContainer = document.querySelector('.grid');
    const duck = document.createElement('div');
    duck.id = `${this.breed}-${i}`;

    const startX = Math.floor(Math.random() * (gridContainer.clientWidth - duck.clientWidth));
    const startY = 0; 

  

    duck.style.left = `${startX}px`;
    duck.style.bottom = `${startY}px`;

    document.querySelector('.Play-space').appendChild(duck);
    
    this.lives = this.lives;
    
    duck.style.position = 'absolute';

    const svgFileName = `duck-upstroke-${this.breed}.svg`;
    
    duck.style.background = `url('assets/${svgFileName}')`; // Replace 'path/to/' with the actual path to your SVG files.
    duck.style.backgroundSize = 'contain';  // Change this line
    duck.style.backgroundRepeat = 'no-repeat'; // Optional: Prevent background from repeating
    duck.style.height = `${this.height}px`;
    duck.style.width = `${this.width}px`;
    duck.style.points = this.points;
    
    duck.dataset.duckInstance = JSON.stringify(this);

    pixelEls.push(duck)
  
    
    animateDuck(duck);
  }

}

class BasicDuck extends Duck {
  constructor(){
    super('basic',1, 'yellow', 200, 100)
  }
}

class AdvancedDuck extends Duck {
  constructor(){
    super('advanced',1, 'orange', 180, 200)
  }
}

class ExpertDuck extends Duck {
  constructor(){
    super('expert', 2, 'red', 160, 500)
  }

}




