const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let numOfMatches = 0;
let clicking = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);

  if(clicking) {
    return;
  }

  
  let currentCard = event.target;
  console.log('currentCard', currentCard);


  // assign color 
  const color = currentCard.classList[0];
  currentCard.classList.add('flipped');
  currentCard.style.backgroundColor = color;

  // assign cards 
  if (card1 === null) {
    card1 = currentCard;
    console.log('card1', card1)
  } else if(card2 === null) {
    card2 = currentCard;
    console.log('card2', card2)
  } 

  if(card1 && card2) {
    clicking = true;
  }

  // check if two cards match colors
  if (card1.classList[0] === card2.classList[0]) {
    numOfMatches += 1;
    console.log('number of matches', numOfMatches)
    // remove click event listeners, you cannot click again
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);

    // remove card assignment
    card1 = null;
    card2 = null;
    
    clicking = false;

  } else {
    
    // remove color and flip back over
    setTimeout(function () {
    card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';

    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    
    // remove card assignment
    card1 = null;
    card2 = null;

    clicking = false;

    }, 1000)
  }

  if(numOfMatches === 5) {
    alert('you win');
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
