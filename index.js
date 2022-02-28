window.onload = function () {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var topics;         // Array of topics
    var chosenTopic;    // Selected topic
    var word;           // Selected word
    var guess;          // Guess
    var guesses = [];   // Stored guesses
    var lives;          // Attempts
    var counter;        // Count correct guesses
    var space;          // Number of spaces in word '-'
   
    // Get HTML elements by ID ------------------------------------------------------------------------------------------
    var showLives = document.getElementById("mylives");
    var showClue = document.getElementById("clue");
   
    // Create alphabet ul ------------------------------------------------------------------------------------------
    var buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
   
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }
       
    // Topic selector ------------------------------------------------------------------------------------------
    var selectTopic = function () {
      if (chosenTopic === topics[0]) {
        topicName.innerHTML = "WORD TOPIC: Historical Figures";
        console.log("WORD TOPIC: Historical Figures")
      } else if (chosenTopic === topics[1]) {
        topicName.innerHTML = "WORD TOPIC: Films";
        console.log("WORD TOPIC: Films")
      } else if (chosenTopic === topics[2]) {
        topicName.innerHTML = "WORD TOPIC: Cities";
        console.log("WORD TOPIC: Cities")
      }
    }
   
    // Create guesses ul ------------------------------------------------------------------------------------------
    result = function () {
      wordHolder = document.getElementById('hold');
      correct = document.createElement('ul');
   
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
   
      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
      }
    }
     
    // Display attempts (lives) & Win/Lose Prompts ------------------------------------------------------------
    comments = function () {
      showLives.innerHTML = "You have " + lives + " attempts!";
      if (lives < 1) {
        showLives.innerHTML = "GAME OVER! Try again!";
      }
      if (counter + space === guesses.length) {
        loadJSON('https://uselessfacts.jsph.pl/random.json?language=en', displayGameOverSuccess, errorFetchingFact)
      }
    }
   
    // OnClick Function ------------------------------------------------------------------------------------------
    check = function () {
      list.onclick = function () {
        var guess = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
          for (var i = 0; i < word.length; i++) {
            if (word[i] === guess) {
              guesses[i].innerHTML = guess;
              counter += 1;
            }
          }
        var j = (word.indexOf(guess));
          if (j === -1) {
            lives -= 1;
            comments();
          } else {
            comments();
          }
        }
      }
     
    // Play ------------------------------------------------------------------------------------------
    play = function () {
      topics = [
        ["cleopatra", "napoleon-bonaparte", "julius-caesar", "marcus-aurelius", "abraham-lincoln", "grace-kelly", "akihito"],
        // ["alien", "dirty-harry", "gone-with-the-wind", "finding-nemo", "forrest-gump"],
        // ["taipei", "milan", "madrid", "amsterdam", "prague"] 
      ];
   
      chosenTopic = topics[Math.floor(Math.random() * topics.length)];
      word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
      word = word.replace(/\s/g, "-");
      console.log(word);
      buttons();
   
      guesses = [];
      lives = 5;
      counter = 0;
      space = 0;
      result();
      comments();
      selectTopic();
    }
    play();
     
    // Hint ------------------------------------------------------------------------------------------
    hint.onclick = function() {
      hints = [
        ["Last true pharaoh of Egypt", "French Emperor from 1804 to 1814", 
          "Led Rome\'s armies in the Gallic Wars before defeating Pompey in a civil war", 
          "16th President of the United States of America", "An early 20th-century American actress who became the Princess of Monaco", 
          "Japan's first emperor to abdicate the throne since 1817"],
        ["1979 Sci-fi horror film", "\"Go ahead. Make my day.\"", "\"Frankly, my dear, I don't give a damn.\"", "\"Fish are friends, not food.\"", 
         "\"I'm pretty tired... I think I'll go home now.\""],
        ["Known for its Shilin market", "The global capital of fashion and design", "Home of the Prado Museum", "Home fo the Van Gogh Museum", 
         "Known for its medieval Astronomical Clock "]
      ];
   
      var topicIndex = topics.indexOf(chosenTopic);
      var hintIndex = chosenTopic.indexOf(word);
      showClue.innerHTML = "HINT: " +  hints [topicIndex][hintIndex];
    }
       
    // Generate random fact IF YOU WIN ----------------------------------------------------------------------------------
    // API URL: https://uselessfacts.jsph.pl/random.json?language=en
    // API Documentation: https://uselessfacts.jsph.pl/
    // How to Read JSON file from URL https://www.educative.io/edpresso/how-to-read-a-json-file-from-a-url-in-javascript
      // Might be better off using jquery next time... this is kinda complicated
      // Libraries over natives ---> "libraries are better at cross-browser stuff"
    function loadJSON(path, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            success(JSON.parse(xhr.responseText));
          }
          else {
            error(xhr);
          }
        }
      };
      xhr.open('GET', path, true);
      xhr.send();
    }
    function displayGameOverSuccess(data) {
      showLives.innerHTML = 'YOU WIN! Here\'s your random fact: <br/>' + data['text']
      console.log('YOU WIN! Here\'s your random fact: ' + data['text'])
    }
    function errorFetchingFact(data) {
      showLives.innerHTML = 'Sorry, we\'re unable to fetch a random fact.'
      console.log(data)
    }

    // Reset (play again) ------------------------------------------------------------------------------------------
    document.getElementById('reset').onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      showClue.innerHTML = "";
      play();
    }
   
  } // end function
  