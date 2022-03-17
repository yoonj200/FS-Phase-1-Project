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

// Globally declared words and hints... is there a way around this?
const wordHintPairs = [
  {
    "cleopatra": "last true pharaoh of Egypt",
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
// Selects word & hint
function selectWord() {
  // 'chosenObject' randomly selects nested object
  let chosenObject = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)]
  // 'pair' = randomly selected key-value pair from nested object
  let pairs = Object.entries(chosenObject)
  let pair = pairs[Math.floor(Math.random() * pairs.length)]
  console.log(pair)

  // Displays topic based off of selected object
  if (chosenObject === wordHintPairs[0]) {
    // <p id="wordTopic"></p>
    wordTopic.innerText = "WORD TOPIC: Historical Figures";
    console.log("WORD TOPIC: Historical Figures")
  } else if (chosenObject === wordHintPairs[1]) {
    wordTopic.innerText = "WORD TOPIC: Films";
    console.log("WORD TOPIC: Films")
  } else if (chosenObject === wordHintPairs[2]) {
    wordTopic.innerText = "WORD TOPIC: Cities";
    console.log("WORD TOPIC: Cities")
  } 
}
selectWord();

})