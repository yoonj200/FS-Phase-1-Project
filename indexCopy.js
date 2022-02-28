// ---------- THIS IS A COPY THAT IS MEANT FOR PRACTICE & REVIEW ----------

window.onload = function () { // onload executes function immediately after page loads
    // Declaring variables globally
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var topics;         // Array of topics
    var chosenTopic;    // Selected topic
    var word;           // Selected word
    var guess;          // Guess
    var guesses = [];   // Stored guesses
    var lives;          // Attempts
    var counter;        // Counts correct guesses
    var space;          // Number of spaces in word '-'
   
    // Declares variables that get HTML elements by ID ------------------------------------------------------------
    var showLives = document.getElementById("mylives");
    var showClue = document.getElementById("clue");
   
    // Create alphabet ul ------------------------------------------------------------------------------------------
    var buttons = function () { 
      myButtons = document.getElementById('buttons'); // declares variable 'myButtons' to get HTML element by ID ('buttons')
      letters = document.createElement('ul');         // declares variable 'letters' to create HTML element 'ul'
   
      for (var i = 0; i < alphabet.length; i++) { // iterates through 'alphabet' array
        letters.id = 'alphabet'; // sets 'alphabet' ID for letters variable (23)
        list = document.createElement('li'); // declares 'list' varialbe that creates HTML element 'li'
        list.id = 'letter'; // sets 'letter' ID for 'list' variable 
        list.innerHTML = alphabet[i]; // sets HTML for 'list' variable as each 'alphabet' array element
        check(); // (84)
        myButtons.appendChild(letters); // appends 'letters' to 'myButtons' 
        letters.appendChild(list); // appends 'list' (27) to 'letters' (23)
      }
    }
       
    // Topic selector ------------------------------------------------------------------------------------------
    var selectTopic = function () {
      if (chosenTopic === topics[0]) { // if 'chosenTopic' is equal to topics[0], first topic category
        topicName.innerHTML = "WORD TOPIC: Historical Figures"; // sets topicName HTML
        console.log("WORD TOPIC: Historical Figures")
      } else if (chosenTopic === topics[1]) { // if 'chosenTopic' is equal to topics[1], second topic category
        topicName.innerHTML = "WORD TOPIC: Films";
        console.log("WORD TOPIC: Films")
      } else if (chosenTopic === topics[2]) {// if 'chosenTopic' is equal to topics[2], third topic category
        topicName.innerHTML = "WORD TOPIC: Cities";
        console.log("WORD TOPIC: Cities")
      }
    }
   
    // Create guesses ul ------------------------------------------------------------------------------------------
    result = function () {
      wordHolder = document.getElementById('hold'); // declares 'wordHolder' variable to get HTML element 'hold'
      correct = document.createElement('ul'); // declares 'correct' variable to get HTML element 'ul'
   
      for (var i = 0; i < word.length; i++) { // iterates through selected word 'word'
        correct.setAttribute('id', 'my-word'); // 'correct' sets value of attribute 'my-word' on element 'id'
        guess = document.createElement('li'); // declares 'guess' variable to get create HTML element 'li' 
        guess.setAttribute('class', 'guess'); // 'guess' sets value of attribute 'guess' on element 'class'
      if (word[i] === "-") { // if part of the word has '-', 'li' shows '-' 
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_"; // otherwise, 'li' shows a visual blank '_'
      }
   
      guesses.push(guess); // adds 'guess' elements to end of 'guesses' array and returns its new length
      wordHolder.appendChild(correct); // appends 'correct' ('ul') to 'wordHolder' ('hold')
      correct.appendChild(guess); // appends 'guess' ('-' or '_') to 'correct' ('ul') 
      }
    }
    
    // Display attempts (lives) & Win/Lose Prompts ------------------------------------------------------------
    comments = function () {
      showLives.innerHTML = "You have " + lives + " attempts!"; // displays number of attempts at all times
      if (lives < 1) { 
        showLives.innerHTML = "GAME OVER! Try again!"; // if lives (attempts) falls below 1, showLives displays this prompt
      }
      if (counter + space === guesses.length) { // if counter (92) and space (61) equal the length of the 'guesses' array 
        loadJSON('https://uselessfacts.jsph.pl/random.json?language=en', displayGameOverSuccess, errorFetchingFact) // (153), (168), (172)
      }
    }
   
    // OnClick Function ------------------------------------------------------------------------------------------
    check = function () {
      list.onclick = function () { // function executes when button is clicked
        var guess = (this.innerHTML); // declares 'guess' (not the one in global scope)
        this.setAttribute("class", "active"); // sets value of attribute 'active' on element 'class'
        this.onclick = null; // absence of value on click
          for (var i = 0; i < word.length; i++) { // iterates through selected word
            if (word[i] === guess) { // if a letter in the selected word matches the guess
              guesses[i].innerHTML = guess; // letter from 'guesses' array displays
              counter += 1; // adds 1 to counter
            }
          }
        var j = (word.indexOf(guess)); // returns position of first occurrence of guessed letter 'guess' in 'word'
          if (j === -1) { // if 'j' === -1 ('guess' isn't found)
            lives -= 1; // subtracts 1 from number of attempts 'lives'
            comments(); // (73)
          } else {
            comments();
          }
        }
      }
     
    // Play ------------------------------------------------------------------------------------------
    play = function () {
        topics = [
            ["alexander-the-great", "napoleon-bonaparte", "catherine-the-great", "marcus-aurelius", "abraham-lincoln", "grace-kelly", "akihito"],
            ["alien", "dirty-harry", "gone-with-the-wind", "finding-nemo", "forrest-gump"],
            ["taipei", "milan", "madrid", "amsterdam", "prague"] 
        ]; // array of 3 topic categories (nested arrays), each with their own words
   
      chosenTopic = topics[Math.floor(Math.random() * topics.length)]; // 'chosenTopic' randomly selects from 'topics' array for 'selectTopic' (37)
      word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
      word = word.replace(/\s/g, "-"); // regex replaces each space, character by character, with the "-" string
      console.log(word);
      buttons(); // (21)
   
      guesses = []; // empty array 'guesses'
      lives = 5; // initial number of attempts
      counter = 0; // initial number of correct guesses 
      space = 0; // initial number of spaces
      result(); // (51)
      comments(); // (73)
      selectTopic(); // (37)
    }
    play(); // (106)
     
    // Hint ------------------------------------------------------------------------------------------
    hint.onclick = function() { // function executes when button is clicked
        hints = [
            ["His empire stretched from Macedonia to Egypt <br/> and from Greece to part of India", "French Emperor from 1804 to 1814", 
                "Empress of Russia for nearly 35 years", "Stoic philosopher and last emperor of the Pax Romana", 
                "16th President of the United States of America", "An early 20th-century American actress who became the Princess of Monaco", 
                "Japan's first emperor to abdicate the throne since 1817"],
            ["1979 Sci-fi horror film", "\"Go ahead. Make my day.\"", "\"Frankly, my dear, I don't give a damn.\"", 
                "\"Fish are friends, not food.\"", "\"I'm pretty tired... I think I'll go home now.\""],
            ["Known for its Shilin market", "The global capital of fashion and design", "Home of the Prado Museum", 
                "Home fo the Van Gogh Museum", "Known for its medieval Astronomical Clock "]
          ]; // array of hint categories (nested arrays), respective 'topics' array 
   
      var topicIndex = topics.indexOf(chosenTopic); // returns position of first occurrence of 'chosenTopic' in 'topics' array
      var hintIndex = chosenTopic.indexOf(word); // returns position of first occurrence of selected word 'word' in 'chosenTopic'
      showClue.innerHTML = "HINT: " +  hints[topicIndex][hintIndex]; // uses property accessors to determine what hint to display
    }
       
    // Generate random fact IF YOU WIN -------------------------------------------------------------------------------------
    // API URL: https://uselessfacts.jsph.pl/random.json?language=en
    // API Documentation: https://uselessfacts.jsph.pl/
    // How to Read JSON file from URL https://www.educative.io/edpresso/how-to-read-a-json-file-from-a-url-in-javascript
        // Learn how to use jquery for next time - this is complicated and NOT ideal
        // Libraries over natives ---> "libraries are better at cross-browser stuff"
    function loadJSON(path, success, error) { // loadJSON reads contents of a JSON file or URL and returns it as an object (URL @ 79)
      var xhr = new XMLHttpRequest(); // XHR interacts with servers, retrieves URL data without a full page refresh. 
                                      // Enables a Web page to update just part of a page without disrupting what the user is doing.
      xhr.onreadystatechange = function () { // onreadystatechange property defines a function to be executed when the readyState changes
        if (xhr.readyState === 4) { // readyState: 4: request finished and response is ready
          if (xhr.status === 200) { // status: 200: "OK" ---> response is ready
            success(JSON.parse(xhr.responseText)); // JSON.parse converts JSON string into object
          } // responseText returns server text after request is sent
          else {
            error(xhr); // creates error object
          }
        }
      };
      xhr.open('GET', path, true); // initializes a newly-created request, or re-initializes an existing one
      xhr.send(); // sends the request to the server
    }
    function displayGameOverSuccess(data) {
      showLives.innerHTML = 'YOU WIN! Here\'s your random fact: <br/>' + data['text'] // displays win text + 'text' key's value
      console.log('YOU WIN! Here\'s your random fact: ' + data['text'])
    }
    function errorFetchingFact(data) {
      showLives.innerHTML = 'Sorry, we\'re unable to fetch a random fact.'
      console.log('Unable to fetch random fact')
    }

    // Reset (play again) ------------------------------------------------------------------------------------------
    document.getElementById('reset').onclick = function() { // assigns click event to Play Again button
      correct.parentNode.removeChild(correct); // (53) removeChild() removes a child node from the DOM and returns the removed node
      letters.parentNode.removeChild(letters); // (23)
      showClue.innerHTML = ""; // (18)
      play(); // 106
    }
   
  } // end
  