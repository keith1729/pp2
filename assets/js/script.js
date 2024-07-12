// Global Variables
let deck = createDeck();
let hiddenCard;
let playersTotal = 0;
let dealersTotal = 0;
let playersAceCount = 0;
let dealersAceCount = 0;
let canHit = true;

// Create deck of cards
function createDeck() {
  const suits = ["c", "d", "h", "s"]; // "clubs", "diamonds", "hearts", "spades"
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
    "a",
  ];
  let deck = [];
  for (let x = 0; x < suits.length; x++) {
    for (let y = 0; y < values.length; y++) {
      deck.push(values[y] + "-" + suits[x]);
    }
  }
  return deck;
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Calculate card values
function getValue(card) {
  let cardData = card.split("-");
  let value = cardData[0];

  if (isNaN(value)) {
    if (value === "a") {
      return 11;
    } else if (value === "j" || value === "q" || value === "k") {
      return 10;
    }
  } else {
    return parseInt(value);
  }
}

// Hit function to draw another card to the player
function hit() {
  if(canHit) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("players-cards").append(image);
    playersTotal += getValue(card);
    playersAceCount += checkForAce(card);
  } else {
    return;
  }
  // Stop being able to draw another card once players score is greater than 21
  if(reduceAce(playersTotal, playersAceCount) >= 21) {
    canHit = false;
    stand();
  } 
  // Account for ace values when drawing a card
  playersTotal = reduceAce(playersTotal, playersAceCount);
  // Display the players updated total score
  document.getElementById(
    "players-total"
  ).innerHTML = `Player ~  ${playersTotal}`;
}

// Stand function to stop drawing cards and determine winner
function stand() {
  canHit = false;

  // Flip the hidden card
  document.getElementById("hidden-card").src =
    "assets/cards/" + hiddenCard + ".png";

  // Draw cards to dealer
  while (dealersTotal < 17) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("dealers-cards").append(image);
    dealersTotal += getValue(card);
    dealersAceCount += checkForAce(card);
  }

  playersTotal = reduceAce(playersTotal, playersAceCount);
  dealersTotal = reduceAce(dealersTotal, dealersAceCount);

  // Determining the winner
  let popup = "";
  if (playersTotal > 21) {
    popup = "Ouch.. You Lose!";
    document.getElementById("player-cards-div").style.backgroundColor = "darkred";
    document.getElementById("dealer-cards-div").style.backgroundColor = "darkgreen";
  } else if (dealersTotal > 21) {
    popup = "Woohoo! You Win!";
    document.getElementById("player-cards-div").style.backgroundColor = "darkgreen";
    document.getElementById("dealer-cards-div").style.backgroundColor = "darkred";
  } else if (playersTotal > dealersTotal) {
    popup = "Woohoo! You Win!";
    document.getElementById("player-cards-div").style.backgroundColor = "darkgreen";
    document.getElementById("dealer-cards-div").style.backgroundColor = "darkred";
  } else if (playersTotal === dealersTotal) {
    popup = "It's a Tie!";
    document.getElementById("player-cards-div").style.backgroundColor = "darkblue";
    document.getElementById("dealer-cards-div").style.backgroundColor = "darkblue";
  } else {
    popup = "Ouch.. You Lose!";
    document.getElementById("player-cards-div").style.backgroundColor = "darkred";
    document.getElementById("dealer-cards-div").style.backgroundColor = "darkgreen";
  }

  // Display the dealers total score
  document.getElementById(
    "dealers-total"
  ).innerHTML = `Dealer ~  ${dealersTotal}`;

  // Display the result on screen
  document.getElementById("win-or-lose").innerHTML = popup;
}

// Function for counting aces
function checkForAce(card) {
  if (card[0] === "a") {
    return 1;
  } else {
    return 0;
  }
}

// Function to reduce ace from 11 to 1 if greater than 21
function reduceAce(playersTotal, playersAceCount) {
  while (playersTotal > 21 && playersAceCount > 0) {
    playersTotal -= 10;
    playersAceCount -= 1;
  }
  return playersTotal;
}

// Allow player to use the "HIT" button
document.getElementById("hit-button").addEventListener("click", hit);
// Allow player to use the "STAND" button
document.getElementById("stand-button").addEventListener("click", stand);

function newGame() {
  createDeck();
  shuffleDeck();
  hiddenCard = deck.pop();
  dealersTotal += getValue(hiddenCard);
  dealersAceCount += checkForAce(hiddenCard);

  // Deal cards to the dealer
  for (let x = 0; x < 1; x++) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("dealers-cards").append(image);
    dealersTotal += getValue(card);
    dealersAceCount += checkForAce(card);
  }

  // Deal cards to the player
  for (let x = 0; x < 2; x++) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("players-cards").append(image);
    playersTotal += getValue(card);
    playersAceCount += checkForAce(card);
  }

  // Display the players total score
  document.getElementById(
    "players-total"
  ).innerHTML = `Player ~  ${playersTotal}`;
}
newGame();