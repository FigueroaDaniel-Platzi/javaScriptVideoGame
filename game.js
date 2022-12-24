const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // canvas need a context to use it. Could be 2d or 3d
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = { // Creating object for player position.
  x: undefined,
  y: undefined,
};
const giftPosition = { // I can modify objects created wit const
  x: undefined,
  y: undefined,
}
let enemyPositions = [];

window.addEventListener('load', setCanvasSize); // You can use window 
window.addEventListener('resize', setCanvasSize); // New case for addEventListener

function setCanvasSize() {
  if(window.innerHeight > window.innerWidth) { // Using window 
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize); // setAttribute 
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if(!map) {
    gameWin();
    return;
  }

  if(!timeStart) {
    timeStart = Date.now(); // Using Date object
    timeInterval = setInterval(showTime, 100); // using setInterval function.
  }

  const mapRows = map.trim().split('\n'); // You can use trim only with strings.
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  showLives();

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);
  
  mapRowCols.forEach((row, rowI) => { // Using forEach with 2 arguments.
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if(col == 'O') {
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if(col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if(col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
  // for(let row = 1; row <= 10; row++) {
  //   for(let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
  //   }
  // }

  // Methods to use with canvas
  // game.fillRect(0,50,100,100);
  // game.clearRect(50,50,50,50);
  // game.clear();

  // game.font = '25px Verdana';
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Platzi', 25, 25);
}

window.addEventListener('keydown', moveByKeys); // I can use window to check keyboard keys.
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if(giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if(enemyCollision) {
    levelFail();
  }
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
}

function levelFail() {
  console.log('Chocaste contra un enemigo :(')
  lives--;

  console.log(lives);

  if(lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('Terminaste el Juego!');
  clearInterval(timeInterval); // Using clearInterval function
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']); // Using Array prototype.
  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp(); // Different way to write if statement 
  else if(event.key == 'ArrowLeft') moveLeft();
  else if(event.key == 'ArrowRight') moveRight();
  else if(event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

  if((playerPosition.y - elementSize) < elementSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');
  
  if((playerPosition.x - elementSize) < elementSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');
  
  if((playerPosition.x + elementSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if((playerPosition.y + elementSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}