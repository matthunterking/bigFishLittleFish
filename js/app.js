console.log('connected!');

const keys = { 38: ['top', '-'], 40: ['top', '+'], 37: ['left', '-'], 39: ['left', '+'] };
const $player = $('<div class="playerFish"></div>');
const playerPostion = {
  top: 250,
  bottom: 300,
  left: 300,
  right: 375,
  width: 75,
  height: 50 };
const fishInPlay = [];

function setUp() {
  //Create a player div - Set size, add controls/movement
  createPlayer();
  createEnemyFish();
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
  const size = Math.floor(Math.random() * 100) + 10;
  const startPoint = Math.floor(Math.random() * 500) + 100;
  const ememyFish = {
    top: (startPoint - size),
    left: 800,
    bottom: startPoint,
    right: 800 + (size * 1.25),
    height: size,
    width: (size * 1.25)
  };
  console.log(playerPostion, ememyFish );
  fishInPlay.push(ememyFish);
  $('body').append($enemyFish);
  $enemyFish.css('top', `${ememyFish.top}px`);
  $enemyFish.css('left', `${ememyFish.left}px`);
  $enemyFish.css('height', `${ememyFish.height}px`);
  $enemyFish.css('width', `${ememyFish.width}px`);
}

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
  // console.log('in move', playerPostion);
  $player.css(`${direction[0]}`, `${playerPostion[direction[0]]}px`);
  if(checkCollision()) checkSize();
}


//// TODO: Make check collion return the fish that has been hit rather than just true or false
function checkCollision() {
  return fishInPlay.some(fish => {
    console.log('ememyFish =>', fish, 'player', playerPostion);
    return playerPostion.left < fish.right
        && playerPostion.right > fish.left
        && playerPostion.bottom > fish.top
        && playerPostion.top < fish.bottom;
  });
}

function checkSize() {

}



//Check for collision - if collision then compare the sizes of Fish

//Function to check if game over or increase the player size - Remove fish from game

//Function to increase player size

$(function(){
  setUp();
});
