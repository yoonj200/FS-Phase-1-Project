window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed')

// Generates letter bank
function generateLetters() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') // string ---> array of ordered substrings 
  // console.log(alphabet)
  for (let i = 0; i < alphabet.length; i++) {
    let btn = document.createElement('button');
    let t = document.createTextNode(alphabet[i]);
    btn.appendChild(t);
    document.querySelector(".keyboard").appendChild(btn); // appends to div class='keyboard'
  }
}
generateLetters();

// Selects word
function topicSelector() {
  const topics = [
    ["cleopatra", "napoleon-bonaparte", "julius-caesar", "marcus-aurelius", "abraham-lincoln", "grace-kelly", "akihito"],
    ["alien", "dirty-harry", "the-matrix", "finding-nemo", "forrest-gump"],
    ["taipei", "milan", "madrid", "amsterdam", "prague"] 
  ];
  hints = [
    ["Last true pharaoh of Egypt", "French Emperor from 1804 to 1814", "Led Rome\'s armies in the Gallic Wars", 
      "A stoic philosopher and Roman emperor", "16th President of the United States of America", 
      "An early 20th-century American actress who became the Princess of Monaco", "Japan's first emperor to abdicate the throne since 1817"],
    ["1979 Sci-fi horror film", "\"Go ahead. Make my day.\"", "\"Ignorance is bliss.\"", "\"Fish are friends, not food.\"", 
      "\"I'm pretty tired... I think I'll go home now.\""],
    ["Known for its Shilin market", "The global capital of fashion and design", "Home of the Prado Museum", "Home of the Van Gogh Museum", 
      "Known for its medieval Astronomical Clock "]
  ];
  let chosenTopic = topics[Math.floor(Math.random() * topics.length)];
  let word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
  // word = word.replace(/\s/g, "-");
    console.log(word);

  if (chosenTopic === topics[0]) {
    wordTopic.innerText = "TOPIC: Historical Figures"; // <p id="wordTopic"></p>
    console.log("Historical Figures")
  } else if (chosenTopic === topics[1]) {
    wordTopic.innerText = "TOPIC: Films";
    console.log("Films")
  } else if (chosenTopic === topics[2]) {
    wordTopic.innerText = "TOPIC: Cities";
    console.log("Cities")
  }
}
topicSelector();

// Selects hint based off topicSelector


/*
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
*/

})