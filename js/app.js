
const keys = { 38: ['top', '-'], 40: ['top', '+'], 37: ['left', '-'], 39: ['left', '+'] };
const $player = $('<div class="playerFish"></div>');
const playerPostion = {
  top: 250,
  bottom: 300,
  left: 300,
  right: 375,
  width: 90,
  height: 50,
  domElement: $player
};
let fishInPlay = [];
let eatenFish;
let gameOver = false;

function setUp() {
  //Create a player div - Set size, add controls/movement
  createPlayer();
  setInterval(() => {
    console.log(gameOver);
    if(!gameOver) createEnemyFish();
    if(gameOver) window.alert('GAME OVER');
  }, 1000);
  //Create a gameboard
  //Randomly generate other Fish
}

function createPlayer() {
  $('body').append($player);
  $player.css('top', `${playerPostion.bottom}px`);
  $player.css('left', `${playerPostion.left}px`);
  addControls();
}

function createEnemyFish() {
  const $enemyFish = $('<div class="playerFish enemyFish"></div>');
  //75 50
  const range = { min: playerPostion.width - 90, max: playerPostion.width + 10 };
  const size = Math.floor(Math.random() * range.max) + range.min;
  const speed = Math.floor(Math.random() * 80) + 20;
  const startPoint = Math.floor(Math.random() * 600) + 100;
  const ememyFish = {
    top: (startPoint - size),
    left: 1100,
    bottom: startPoint,
    right: 1100 + (size * 1.35),
    height: size,
    width: (size * 1.35),
    domElement: $enemyFish,
    speed: speed
  };
  fishInPlay.push(ememyFish);
  $('body').append($enemyFish);
  $enemyFish.css('top', `${ememyFish.top}px`);
  $enemyFish.css('left', `${ememyFish.left}px`);
  $enemyFish.css('height', `${ememyFish.height}px`);
  $enemyFish.css('width', `${ememyFish.width}px`);
  moveEmemyFish(ememyFish);
}

//make fish a class remove is a method on this

function addControls() {
  $(window).keydown((e) => {
    const direction = keys[e.which];
    movePlayer(direction);
  });
}

function movePlayer(direction) {
  direction[1] === '+' ? playerPostion[direction[0]] += 3 : playerPostion[direction[0]] -= 3;
  playerPostion.bottom = playerPostion.top + playerPostion.height;
  playerPostion.right = playerPostion.left + playerPostion.width;
  $player.css(`${direction[0]}`, `${playerPostion[direction[0]]}px`);
}

function moveEmemyFish(ememyFish) {
  setInterval(() => {
    checkCollision();
    const left = ememyFish.left --;
    ememyFish.left -= 1;
    ememyFish.right = left + ememyFish.width;
    ememyFish.domElement.css('left', `${left}px`);
  }, ememyFish.speed);
}

function increaseSize() {
  playerPostion.height += 5;
  playerPostion.width += 9;
  playerPostion.domElement.css('height', `${playerPostion.height}px`);
  playerPostion.domElement.css('width', `${playerPostion.width}px`);
}

//// TODO: Make check collion return the fish that has been hit rather than just true or false
function checkCollision() {
  eatenFish = fishInPlay.filter(fish => {
    return playerPostion.left < fish.right
        && playerPostion.right > fish.left
        && playerPostion.bottom > fish.top
        && playerPostion.top < fish.bottom;
  });
  checkSize();
  if(eatenFish.length) {
    removeFish(eatenFish);
    increaseSize();
  }
}

function checkSize() {
  const playerSize = playerPostion.width * playerPostion.height;
  gameOver = !!eatenFish.filter(fish => {
    const fishSize = fish.width * fish.height;
    return fishSize > playerSize;
  }).length;
  if(gameOver) return window.alert('GAME OVER!');
}

function removeFish(eatenFish) {
  fishInPlay = fishInPlay.filter(fish => !eatenFish.includes(fish));
  eatenFish.forEach(fish => fish.domElement.remove());
}



//Check for collision - if collision then compare the sizes of Fish

//Function to check if game over or increase the player size - Remove fish from game

//Function to increase player size

$(function(){
  setUp();
});
