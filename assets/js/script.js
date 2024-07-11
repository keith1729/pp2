// Global Variables
let deck = createDeck();
let card = "";
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
//   console.log(deck);

// Shuffle the deck
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
// shuffleDeck();
// console.log(deck);

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
// getValue(card);

function checkForAce(card) {
  if (card[0] === "a") {
    return 1;
  } else {
    return 0;
  }
}
// checkForAce(card);

// New Game
function newGame() {
  createDeck();
  shuffleDeck();
  hiddenCard = deck.pop();
  dealersTotal += getValue(hiddenCard);
  dealersAceCount += checkForAce(hiddenCard);
  //   console.log(hiddenCard);
  //   console.log(dealersTotal);
  // Deal cards to the dealer
  while (dealersTotal < 17) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("dealers-cards").append(image);
    dealersTotal += getValue(card);
    dealersAceCount += checkForAce(card);
  }
  console.log(dealersTotal);
  
  // Deal cards to the player
  for (let x = 0; x < 2; x++) {
    let image = document.createElement("img");
    let card = deck.pop();
    image.src = "assets/cards/" + card + ".png";
    document.getElementById("players-cards").append(image);
    playersTotal += getValue(card);
    playersAceCount += checkForAce(card);
  }
  console.log(playersTotal);

  // Allow player to use the "HIT" button
  document.getElementById("hit-button").addEventListener("click", hit)
}
newGame();

// Hit function
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
}
