window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed')

  // Globally declared words and hints...
  const wordHintPairs = [
    {
      "cleopatra": "Last true pharaoh of Egypt",
      "napolean-bonaparte": "French Emperor from 1804 to 1814",
      "marcus-aurelius": "A stoic philosopher and Roman emperor",
      "abraham-lincoln": "16th President of the United States of America",
      "grace-kelly": "An early 20th-century American actress who became the Princess of Monaco"
    },
    {
      "alien": "1979 Sci-fi horror film",
      "dirty-harry": "\"Go ahead. Make my day.\"",
      "the-matrix": "\"Ignorance is bliss.\"",
      "finding-nemo": "\"Fish are friends, not food.\"",
      "forrest-gump": "\"I'm pretty tired... I think I'll go home now.\""
    },
    {
      "taipei": "Known for its Shilin market",
      "milan": "The global capital of fashion and design",
      "madrid": "Home of the Prado Museum",
      "amsterdam": "Home of the Van Gogh Museum",
      "prague": "Known for its medieval Astronomical Clock"
    }
  ]

// Generates letter bank ----------------------------------------
  function generateLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') // array of ordered substrings 
    for (let i = 0; i < alphabet.length; i++) {
      let btn = document.createElement('button');
      let t = document.createTextNode(alphabet[i]);
      btn.appendChild(t);
      document.querySelector(".keyboard").appendChild(btn); // appends to <div class="keyboard"></div>
    }
  }
  generateLetters();

// Selects word & hint ----------------------------------------
  function selectWord() {
    // 'chosenObject' randomly selects nested object from 'wordHintPairs' array
    let chosenObject = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)]
    // 'pairs' converts 'chosenObject' key-value pairs into [key, value] arrays
    let pairs = Object.entries(chosenObject)
    // 'pair' randomly selects [key, value] from 'pairs'
    let pair = pairs[Math.floor(Math.random() * pairs.length)]
      console.log(pair)
    let hint = pair[1]

    // Hint button (nested) ----------------------------------------
    document.getElementById('hint').onclick = function() {
      clue.textContent = "HINT: " + hint; // <p id="clue"></p>
      document.getElementById("hint").onclick = null; // Hint button can only be clicked once
    }
    
    // 'wordTopic.textContent' displays topic based off of selected object 
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
  }
  selectWord();

// Play again button ----------------------------------------
  reset.onclick = function() {
    // alert("Placeholder :]")
    clue.textContent = "Need a Hint? Click the Hint button!"
    selectWord();
  }

  // Create guesses ul ----------------------------------------
    // parses through selectWord() 'pair' to find key (word)
  // handleGuesses.onClick = function() {
    
  // }
    /*
      function firstFunction() {
      return "testing 123";
      }

      var test = firstFunction();  // this will grab you the return value from firstFunction();
      alert(test);  
    */

})