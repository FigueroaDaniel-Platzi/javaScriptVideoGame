const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // canvas need a context to use it. Could be 2d or 3d

let canvasSize;
let elementSize;

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

  const map = maps[1];
  const mapRows = map.trim().split('\n'); // You can use trim only with strings.
  const mapRowCols = mapRows.map(row => row.trim().split(''));
   
  for(let row = 1; row <= 10; row++) {
    for(let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
    }
  }

  // Methods to use with canvas
  // game.fillRect(0,50,100,100);
  // game.clearRect(50,50,50,50);
  // game.clear();

  // game.font = '25px Verdana';
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Platzi', 25, 25);
}