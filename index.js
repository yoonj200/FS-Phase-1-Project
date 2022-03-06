window.addEventListener('DOMContentLoaded', () => {

// Create alphabet ul --------------------------------------------------
let buttons = function () {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const alphaBtns = document.getElementById('buttons');
  const letters = document.createElement('ul');

  for (let i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    let list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    // check();
    alphaBtns.appendChild(letters);
    letters.appendChild(list);
  }
}
buttons();

// Topic selector --------------------------------------------------
let selectTopic = function () {
  const topics = [
    ["cleopatra", "napoleon-bonaparte", "julius-caesar", "marcus-aurelius", "abraham-lincoln", "grace-kelly", "akihito"],
    ["alien", "dirty-harry", "the-matrix", "finding-nemo", "forrest-gump"],
    ["taipei", "milan", "madrid", "amsterdam", "prague"] 
  ];
  
  let chosenTopic = topics[Math.floor(Math.random() * topics.length)];
  let word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
  // let word = word.replace(/\s/g, "-");
  // console.log(word);

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
selectTopic();


})
  