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

  let chosenTopic = topics[Math.floor(Math.random() * topics.length)];
  let word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
  // word = word.replace(/\s/g, "-");
    console.log(word);

  if (chosenTopic === topics[0]) {
    topicName.innerText = "WORD TOPIC: Historical Figures";
    console.log("WORD TOPIC: Historical Figures")
  } else if (chosenTopic === topics[1]) {
    topicName.innerText = "WORD TOPIC: Films";
    console.log("WORD TOPIC: Films")
  } else if (chosenTopic === topics[2]) {
    topicName.innerText = "WORD TOPIC: Cities";
    console.log("WORD TOPIC: Cities")
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