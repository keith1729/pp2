// Global Variables

let deck;
let card;
let hidden;
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
    // return deck;
    console.log(deck);
  }
  createDeck();
  