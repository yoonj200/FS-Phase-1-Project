window.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed')
const topics = [
  ["cleopatra", "napoleon-bonaparte", "julius-caesar", "marcus-aurelius", "abraham-lincoln", "grace-kelly", "akihito"],
  ["alien", "dirty-harry", "the-matrix", "finding-nemo", "forrest-gump"],
  ["taipei", "milan", "madrid", "amsterdam", "prague"] 
];

// Create letter bank
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

// Create fill-in-the-blank


})