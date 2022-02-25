window.onload = function () { // execute function after page loads
    // Declaring variables globally
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var topics;         // Array of topics
    var chosenTopic;    // Selected topic
    var getHint;        // Word getHint
    var word;           // Selected word
    var guess;          // Guess
    var guesses = [];   // Stored guesses
    var lives;          // Lives
    var counter;        // Count correct guesses
    var space;          // Number of spaces in word '-'
   
    // Get elements from HTML
    var showLives = document.getElementById("mylives");
    var showTopic = document.getElementById("stopic");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");
   
    // Create alphabet ul
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
       
    // Topic selector
    var selectTopic = function () {
      if (chosenTopic === topics[0]) {
        topicName.innerHTML = "WORD TOPIC: Premier League Football Teams";
        console.log("WORD TOPIC: Premier League Football Teams")
      } else if (chosenTopic === topics[1]) {
        topicName.innerHTML = "WORD TOPIC: Films";
        console.log("WORD TOPIC: Films")
      } else if (chosenTopic === topics[2]) {
        topicName.innerHTML = "WORD TOPIC: Cities";
        console.log("WORD TOPIC: Cities")
      }
    }
   
    // Create guesses ul
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
     
    // Display attempts (lives)
    comments = function () {
      showLives.innerHTML = "You have " + lives + " attempts!";
      if (lives < 1) {
        showLives.innerHTML = "GAME OVER";
      }
      // for (var i = 0; i < guesses.length; i++) {  ----> unnecessary
        if (counter + space === guesses.length) {
          // showLives.innerHTML = "YOU WIN! <br />" /*+ "Random Fact: " + fetchFact()*/;
          loadJSON('https://uselessfacts.jsph.pl/random.json?language=en', displayGameOverSuccess, errorFetchingQuote)
        }
      // }
    }
   
    // OnClick Function
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
     
    // Play
    play = function () {
      topics = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
      ]; // array of 3 topics, each with their own words
   
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
     
    
   
  } // end function
  