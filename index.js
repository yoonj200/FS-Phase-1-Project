window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed')
// Globally stores game info
  let gameObject = {
    word:'', 
    hint:'', 
    storedGuesses: [],
    myLives: 5
  };
// Initializes game state ----------------------------------------
  function initGame() {
    clue.textContent = "Need a Hint? Click the Hint button!";
    blanks.textContent = "";
    gameObject.storedGuesses = [];
    gameObject.myLives = 5;
    myLives.textContent = "You have " + gameObject.myLives + " attempts."
    document.querySelectorAll(".keyboard .letter").forEach(element => element.disabled=false);
    document.getElementById("hint").disabled=false;
    selectWord();
  }
  initGame();
// Generates responsive letter bank ----------------------------------------
  let generateLetters = function() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') // array of ordered substrings 
    for (let i = 0; i < alphabet.length; i++) { // iterates through substrings and creates button for each
      let btn = document.createElement('button');
      let t = document.createTextNode(alphabet[i]);

      btn.setAttribute('class', 'letter') // <button class="letter"> ... </button>
      btn.appendChild(t);
      document.querySelector(".keyboard").appendChild(btn); // appends to <div class="keyboard"></div>

      btn.onclick = function() { // creates onclick event for letter buttons 
        let evt = new CustomEvent("guess", {detail: {letter: alphabet[i]}, bubbles: true} )
        this.dispatchEvent(evt)
        this.disabled=true; // makes button unclickable 
      }
    }
    // console.log(this)
    document.querySelector(".gameBoard").addEventListener("guess", handleGuesses, false)
  }
  generateLetters();
// Randomly selects word & hint ----------------------------------------
  function selectWord() {
    const wordHintPairs = [
      {
        "cleopatra": "The last true pharaoh of Egypt",
        "napolean-bonaparte": "French Emperor from 1804 to 1814",
        "marcus-aurelius": "A stoic philosopher and Roman emperor",
        "abraham-lincoln": "16th President of the United States of America",
        "grace-kelly": "20th-century American actress who became the Princess of Monaco"
      },
      {
        "alien": "1979 Sci-fi horror film",
        "dirty-harry": "\"Go ahead. Make my day.\"",
        "the-matrix": "\"Ignorance is bliss.\"",
        "finding-nemo": "\"Fish are friends, not food.\"",
        "forrest-gump": "\"What's normal anyways?\""
      },
      {
        "taipei": "Known for its Shilin market",
        "milan": "The global capital of fashion and design",
        "madrid": "Home of the Prado Museum",
        "amsterdam": "Home of the Van Gogh Museum",
        "prague": "Known for its medieval Astronomical Clock"
      }
    ]
    let chosenObject = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)]
    let pairs = Object.entries(chosenObject)
    let pair = pairs[Math.floor(Math.random() * pairs.length)]
    console.log(pair)
    gameObject.word = pair[0] // stores in globally scoped gameObject
    gameObject.hint = pair[1]

    // Displays topic (chosen object) 
    if (chosenObject === wordHintPairs[0]) { // <p id="wordTopic"></p>
      wordTopic.textContent = "TOPIC: Historical Figures";
        console.log("TOPIC: Historical Figures")
    } else if (chosenObject === wordHintPairs[1]) {
      wordTopic.textContent = "TOPIC: Films";
        console.log("TOPIC: Films")
    } else if (chosenObject === wordHintPairs[2]) {
      wordTopic.textContent = "TOPIC: Cities";
        console.log("TOPIC: Cities")
    } 
    generateResults(gameObject.word);
  }

// Hint button ----------------------------------------
document.getElementById('hint').onclick = function() {
  clue.textContent = "HINT: " + gameObject.hint; // <p id="clue"></p>
  document.getElementById("hint").disabled = true; // Hint button can only be clicked once
}
// Play again button ----------------------------------------
  reset.onclick = function() {
    initGame();
  }
// Generates blanks for chosen word ----------------------------------------
  function generateResults(letters) {
    let wordHolder = document.getElementById('blanks');
    let correct = document.createElement('ul');
    correct.setAttribute('id', 'my-word');

    for (let i = 0; i < letters.length; i++) {
      let letterHolder = document.createElement('li');
      letterHolder.setAttribute('class', 'guess');
      if (letters[i] === "-") {
        letterHolder.textContent = " ";
      } else {
        letterHolder.textContent = "_";
      }
      correct.appendChild(letterHolder);
      wordHolder.appendChild(correct);
    }
  }

// Handles user's guesses ---------------------------------------- 
  function handleGuesses(guess) {
    gameObject.storedGuesses.push(guess.detail.letter); // CustomEvent.detail returns any data passed when initializing event
    console.log(gameObject.storedGuesses)
    // if chosen word contains guessed letter, blank is replaced with guessed letter
    if (gameObject.word.includes(guess.detail.letter)) {
      let letterPositions = findAllLetterPositions(gameObject.word, guess.detail.letter) 
      letterPositions.forEach(position => document.querySelectorAll("li.guess")[position].textContent = guess.detail.letter)
      gameSuccess()
    } else { 
        gameObject.myLives -=1 // incorrect guesses deduct a life
        myLives.textContent = "You have " + gameObject.myLives + " remaining attempts."
        gameOver();
      }
  }
// Game success ----------------------------------------
function gameSuccess() {
  let guessListElements = document.querySelectorAll("li.guess")
      let checkBlanks = Array.from(guessListElements).filter(element => element.textContent === "_").length
      if (checkBlanks === 0) {
        fetchFact()
        gameOver()
        document.querySelectorAll(".keyboard .letter").forEach(element => element.disabled=true);
        document.getElementById("hint").disabled=true;
      }
}
// Game Over ----------------------------------------
function gameOver() {
  if (gameObject.myLives < 1) {
    myLives.textContent = "GAME OVER! Try again!"
    document.querySelectorAll(".keyboard .letter").forEach(element => element.disabled=true);
    document.getElementById("hint").disabled=true;
  }
}
// Finds and stores letter positions ----------------------------------------
  function findAllLetterPositions(haystack, needle) {
    let position = 0;
    let positions = [];
    while(haystack.indexOf(needle, position) > -1) {
      position = haystack.indexOf(needle, position) + 1;
      positions.push(position - 1)
    }
    return positions;
  }
// Fetches API data (random fact) ----------------------------------------
  function fetchFact() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(function (response) {
      // take the response, which is a JSON-formatted **string**,
      // and parse it into an actual JavaScript **object**
      return response.json();
    }) 
    .then(function (data) {
      myLives.textContent = `You win! Here's your random fact: ` + data[`text`];
    });
  }
})