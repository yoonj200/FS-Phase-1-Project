// make gameObject an actual class
// make every reference to gameObject a call on a member function

// const gameObject = {
//   word:'',
//   hint:'',
//   storedGuesses: [],
//   myLives: 5
// };
class gameObject {
  // constructor(word, hint, storedGuesses, myLives) {
  constructor() {
    this.word = '',
    this.hint = '',
    this.storedGuesses = [],
    this.myLives = 5
  }
}

const initGame = () => {
  clue.textContent = 'Need a Hint? Click the Hint button!';
  blanks.textContent = '';
  gameObject.storedGuesses = [];
  gameObject.myLives = 5;
  myLives.textContent = 'You have ' + gameObject.myLives + ' attempts.'
  document.querySelectorAll('.keyboard .letter').forEach(element => element.disabled=false);
  document.getElementById('hint').disabled=false;
  selectWord();
}

const selectWord = () => {
  fetch('http://localhost:3000/wordHintPair')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let chosenObject = data[Math.floor(Math.random() * data.length)]
    let chosenPairs = chosenObject.pairs
    let chosenPairsIntoArray = Object.entries(chosenPairs) 
    let chosenPair = chosenPairsIntoArray[Math.floor(Math.random() * chosenPairsIntoArray.length)]
    console.log(chosenPair)
    
    // gameObject.word = chosenPair[0]
    // gameObject.hint = chosenPair[1]

    const updateHint = (chosenPair) => {
      this.word = chosenPair[0]
      this.word = chosenPair[1]
    }
    updateHint();

    wordTopic.textContent = 'TOPIC: ' + chosenObject.topic;
    console.log(chosenObject.topic)

    generateBlanks(gameObject.word.split(''));
  })
}

const generateBlanks = (letters) => {
  let wordHolder = document.getElementById('blanks');
  let correct = document.createElement('ul');
  correct.setAttribute('id', 'my-word');

  letters.forEach(letter => {
    let letterHolder = document.createElement('li');
    letterHolder.setAttribute('class', 'guess');
    if (letter === '-') {
      letterHolder.textContent = ' ';
    } else {
      letterHolder.textContent = '_';
    }
    correct.appendChild(letterHolder);
    wordHolder.appendChild(correct);
  })
}

const generateLetters = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('') 
  alphabet.forEach(letter => { 
    let btn = document.createElement('button');
    let t = document.createTextNode(letter);

    btn.setAttribute('class', 'letter')
    btn.appendChild(t);
    document.querySelector('.keyboard').appendChild(btn);

    btn.addEventListener('click', function() {
      let evt = new CustomEvent('guess', {detail: {letter: letter}, bubbles: true} )
      this.dispatchEvent(evt);
      this.disabled=true;
    })
  })
  document.querySelector('.gameBoard').addEventListener('guess', handleGuesses, false)
}

const handleGuesses = ({detail}) => {
  gameObject.storedGuesses.push(detail.letter); 
  console.log(gameObject.storedGuesses)
  
  if (gameObject.word.includes(detail.letter)) {
    let letterPositions = findAllLetterPositions(gameObject.word, detail.letter) 
    letterPositions.forEach(position => document.querySelectorAll('li.guess')[position].textContent = detail.letter)
    gameSuccess()
  } else { 
      gameObject.myLives -=1 
      myLives.textContent = 'You have ' + gameObject.myLives + ' remaining attempts.'
      gameOver();
    }
}

const gameSuccess = () => {
  let guessListElements = document.querySelectorAll('li.guess')
      let checkBlanks = Array.from(guessListElements).filter(element => element.textContent === "_").length
      if (checkBlanks === 0) {
        fetchFact()
        gameOver()
        document.querySelectorAll('.keyboard .letter').forEach(element => element.disabled=true);
        document.getElementById('hint').disabled=true;
      }
}

const gameOver = () => {
  if (gameObject.myLives < 1) {
    myLives.textContent = 'GAME OVER! Try again!'
    document.querySelectorAll('.keyboard .letter').forEach(element => element.disabled=true);
    document.getElementById('hint').disabled=true;
  }
}

const findAllLetterPositions = (haystack, needle) => {
  let position = 0;
  let positions = [];
  while(haystack.indexOf(needle, position) > -1) {
    position = haystack.indexOf(needle, position) + 1;
    positions.push(position - 1)
  }
  return positions;
}

const fetchFact = () => {
  fetch('https://uselessfacts.jsph.pl/random.json?language=en')
  .then(response => response.json())
  .then( data => {
    myLives.textContent = `You win! Here's your random fact: ` + data[`text`];
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initGame();
  generateLetters();

  hint.addEventListener('click', () => {
    clue.textContent = 'HINT: ' + gameObject.hint;
    document.getElementById('hint').disabled = true;
  })
  reset.addEventListener('click', () => {
    initGame();
  })
  
  const themeButton = document.createElement('button');
  themeButton.setAttribute('id', 'themeButton');
  themeButton.innerText = 'Theme';
  document.body.appendChild(themeButton);

  // let expandingList = document.createElement('ul', { is : 'expanding-list' })
  // document.createElement('button', { 'id' : 'themeButton', 'innerText' : 'Theme' })

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('theme');
  })

   
})