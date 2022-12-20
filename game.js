const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // canvas need a context to use it. Could be 2d or 3d
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

const playerPosition = { // Creating object for player position.
  x: undefined,
  y: undefined,
}

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

  const map = maps[0];
  const mapRows = map.trim().split('\n'); // You can use trim only with strings.
  const mapRowCols = mapRows.map(row => row.trim().split(''));

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
      }

      game.fillText(emoji, posX, posY);
    })
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
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp(); // Different way to write if statement 
  else if(event.key == 'ArrowLeft') moveLeft();
  else if(event.key == 'ArrowRight') moveRight();
  else if(event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');
  playerPosition.y -= elementSize;
  startGame();
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');
  playerPosition.x -= elementSize;
  startGame();
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');
  playerPosition.x += elementSize;
  startGame();
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  playerPosition.y += elementSize;
  startGame();
}