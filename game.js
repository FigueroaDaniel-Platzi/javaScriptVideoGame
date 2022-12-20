const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // canvas need a context to use it. Could be 2d or 3d

window.addEventListener('load', startGame); // You can use window 

function startGame() {
  let canvasSize;

  if(window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  const elementSize = canvasSize / 10;

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