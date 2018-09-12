console.log('connected!');

const keys = { 38: ['top', '-'], 40: ['top', '+'], 37: ['left', '-'], 39: ['left', '+'] };
const $player = $('<div class="playerFish"></div>');
const playerPostion = { top: 300, left: 300, bottom: 350, right: 475 };
const fishInPlay = [];

function setUp() {
  //Create a player div - Set size, add controls/movement
  createPlayer();
  //Create a gameboard
  //Randomly generate other Fish
}

function createPlayer() {
  $('body').append($player);
  addControls();
}

function addControls() {
  $(window).keydown((e) => {
    const direction = keys[e.which];
    movePlayer(direction);
  });
}

function movePlayer(direction) {
  direction[1] === '+' ? playerPostion[direction[0]] += 3 : playerPostion[direction[0]] -= 3;
  playerPostion.bottom = playerPostion.top + 50;
  playerPostion.right = playerPostion.left + 75;
  console.log('in move', playerPostion);
  $player.css(`${direction[0]}`, `${playerPostion[direction[0]]}px`);
  console.log(checkCollision());
}

function checkCollision() {
  return fishInPlay.some(fish => {
    return playerPostion.left < fish.right
        && playerPostion.right > fish.left
        && playerPostion.bottom > fish.top
        && playerPostion.top < fish.bottom;
  });
}



//Check for collision - if collision then compare the sizes of Fish

//Function to check if game over or increase the player size - Remove fish from game

//Function to increase player size

$(function(){
  setUp();
});
