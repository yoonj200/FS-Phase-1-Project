window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed')
// Globally stores game info ----------------------------------------
  const gameObject = {
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
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') 
    for (let i = 0; i < alphabet.length; i++) { // creates button for each substring
      let btn = document.createElement('button');
      let t = document.createTextNode(alphabet[i]);

      btn.setAttribute('class', 'letter') // <button class="letter"> ... </button>
      btn.appendChild(t);
      document.querySelector(".keyboard").appendChild(btn); // appends to <div class="keyboard"></div>

      btn.addEventListener("click", function() {
        let evt = new CustomEvent("guess", {detail: {letter: alphabet[i]}, bubbles: true} )
        this.dispatchEvent(evt)
        this.disabled=true; // makes button unclickable
      })
    }
    document.querySelector(".gameBoard").addEventListener("guess", handleGuesses, false)
  }
  generateLetters();
// Randomly selects word & hint ----------------------------------------
  function selectWord() {
    fetch("http://localhost:3000/wordHintPair")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let wordHintPairs = data;
      let chosenObject = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)]
      let pairs = Object.entries(chosenObject)
      let chosenPair = pairs[Math.floor(Math.random() * pairs.length)]
      console.log(chosenPair)
      gameObject.word = chosenPair[0]
      gameObject.hint = chosenPair[1]

      if (chosenObject === wordHintPairs[0]) {
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
    })
  }
// Hint button ----------------------------------------
  hint.addEventListener("click", function() {
    clue.textContent = "HINT: " + gameObject.hint;
    document.getElementById("hint").disabled = true; // Hint button can only be clicked once
  })
// Play again button ----------------------------------------
  reset.addEventListener("click", function() {
    initGame();
  })
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
    // CustomEvent.detail returns any data passed when initializing event
    gameObject.storedGuesses.push(guess.detail.letter); 
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
  // Call 'fetch()' and pass the URL to a data source as the argument. 
  // 'fetch()' returns a Promise object representing datasource sends back
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    // Next, call `then()` on the Promise object returned by calling
    // `fetch()`. `then()` takes a callback function as an argument
    .then(function (response) {
      // Callback function processes object
      return response.json();
      // parses response (JSON-formatted **string**) into a JavaScript **object**
    })
    // The next 'then()' receives parsed JSON object returned form first 'then()'
    .then(function (data) {
      // Second callback function performs DOM manipulation using data returned from server
      myLives.textContent = `You win! Here's your random fact: ` + data[`text`];
    });
  }
})