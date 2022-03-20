window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed')
  function initGame() {
    clue.textContent = "Need a Hint? Click the Hint button!";
    blanks.textContent = "";
    gameObject.storedGuesses = [];
    gameObject.myLives = 5;
    myLives.textContent = "You have " + gameObject.myLives + " remaining attempts."
    document.querySelectorAll(".keyboard .letter").forEach(element => element.disabled=false);
    selectWord();
  }

  let gameObject = {
    word:'', 
    hint:'', 
    storedGuesses: [],
    myLives: 5
  };

  initGame();

// Generates letter bank ----------------------------------------
  let generateLetters = function() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') // array of ordered substrings 
    for (let i = 0; i < alphabet.length; i++) { // iterates through substrings and creates button for each
      let btn = document.createElement('button');
      let t = document.createTextNode(alphabet[i]);

      btn.setAttribute('class', 'letter')
      btn.onclick = function() {
        let evt = new CustomEvent("guess", {detail: {letter: alphabet[i]}, bubbles: true} )
        this.dispatchEvent(evt)
        this.disabled=true;
      }

      btn.appendChild(t);
      document.querySelector(".keyboard").appendChild(btn); // appends to <div class="keyboard"></div>
    }
  }
  generateLetters();
  console.log(this)
  document.querySelector(".gameBoard").addEventListener("guess", handleGuesses, false)

// Selects word & hint ----------------------------------------
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
    //  chosenObject = random nested object from 'wordHintPairs' array
    let chosenObject = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)]
    //  pairs = converts 'chosenObject' key-value pairs into [key, value] arrays
    let pairs = Object.entries(chosenObject)
    //  pair = random [key, value] from 'pairs'
    let pair = pairs[Math.floor(Math.random() * pairs.length)]
      console.log(pair)
    gameObject.word = pair[0]
    gameObject.hint = pair[1]
    
    // Hint button (nested) ----------------------------------------
    document.getElementById('hint').onclick = function() {
      clue.textContent = "HINT: " + gameObject.hint; // <p id="clue"></p>
      document.getElementById("hint").onclick = null; // Hint button can only be clicked once
    }

    // displays topic based off of chosen object 
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

// Play again button ----------------------------------------
  reset.onclick = function() {
    initGame();
  }

// Generates blanks (and letters) ----------------------------------------
  function generateResults(letters) {
    let wordHolder = document.getElementById('blanks');
    let correct = document.createElement('ul');
    correct.setAttribute('id', 'my-word');

    for (let i = 0; i < letters.length; i++) {
      let letterHolder = document.createElement('li');
      letterHolder.setAttribute('class', 'guess');
      if (letters[i] === "-") {
        letterHolder.textContent = "-";
        // space = 1;
      } else {
        letterHolder.textContent = "_";
      }
      correct.appendChild(letterHolder);
      wordHolder.appendChild(correct);
    }
    // handleGuesses(letters);
  }

  function handleGuesses(guess) {
    gameObject.storedGuesses.push(guess.detail.letter);
    console.log(gameObject.storedGuesses)
    if (gameObject.word.includes(guess.detail.letter)) {
      for (let i = 0; i < gameObject.word.length; i++) {
        if (gameObject.word[i] === guess) {
          gameObject.storedGuesses[i].textContent = guess;
        }
      }
    } else {
      gameObject.myLives -=1
      myLives.textContent = "You have " + gameObject.myLives + " remaining attempts."
    }
  }

})