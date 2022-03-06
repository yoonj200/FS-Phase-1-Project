window.addEventListener('DOMContentLoaded', () => {

// Create alphabet ul ------------------------------
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

})
  