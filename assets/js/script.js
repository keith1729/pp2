// Global Variables
let deck = createDeck();
let card;
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
    // console.log(deck);
  }
//   createDeck();
  
// Shuffle the deck  
function shuffleDeck() {
    // let deck = createDeck();
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length);
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);
  }
// shuffleDeck();

function newGame() {
    hiddenCard = deck.pop();
    dealersTotal += getValue(hiddenCard);
}

// Calculate card values
function getValue(card) {
    let cardData = card.split("-");
    let value = cardData[0];

    if(isNaN(value)) {
        if(value === "a") {
            return 11;
        }
        else if(value === "j" || value === "q" || value === "k") {
            return 10;
        }
        else {
            return parseInt(value);
        }
    }
}
// newGame();
// getValue();