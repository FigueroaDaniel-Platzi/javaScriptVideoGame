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

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementSize + 'px Verdana';
  game.textAlign = 'end';

  for(let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementSize, elementSize * i);
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