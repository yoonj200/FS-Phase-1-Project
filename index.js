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
   
    
   
  } // end function
  