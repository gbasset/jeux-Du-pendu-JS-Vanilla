const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.querySelector('#final-message');
const pop = document.querySelector('.popup')
const fill = document.querySelector('.figure-container')
let Realsec = 0
let sec = 0
let Realmin = 0
let min = 0
function chronoForSessionGlobal() {
  Realsec += 1
  sec = Realsec
  if (Realsec < 10) {
    sec = "0" + sec
  }
  if (Realsec > 59) {
    Realmin += 1
    sec = 0
    sec = "0" + sec
    Realsec = 0
  }
  if (Realmin < 10) {
    min = "0" + Realmin
  }
  else {
    min = Realmin
  }
  document.querySelector(".chronotime").innerHTML = "Temps de jeux : " + min + ":" + sec

}

// Track if Hover on product
let lunchChron = setInterval(() => {
  chronoForSessionGlobal()
}, 1000);
const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'application', 'pragrammer', 'chaussette', 'vache', 'quiche', 'electron', 'dindon', 'zizi', 'caca', 'jambon', 'avion', 'terre', 'caniche', 'voiture', 'joue', "maman", "taupe", "cabane", "mondial", "triangle", "dangereux", "tambourin", "labyrinthe", "kaléidoscope", "conquistador", "conspirateur", "rhododendron", "qualification", "Protozoaire", "quadrilatère", "zygomatique", "sorcellerie", "belligérant", "cithare", "chariot", "clairon", "corbeau", "cortège", "crapaud", "cymbale", "dentier", "djembé", "drapeau", "exemple", "fourmis", "grandir", "iceberg", "javelot", "jockey",
  "journal", "journée", "jouxter", "losange", "macadam", "mondial", "notable", "oxygène", "panique", "pétrole, poterie, pouvoir, renégat, scooter, senteur, sifflet, spirale, sucette, trophe, tonneau, trousse, tunique, ukulélé, vautour", "zozoter"]


let selectedWord = words[Math.floor(Math.random() * words.length)]


let correctLetters = []
const wrongLetters = []

// show the hidden word
const displayWord = () => {
  //display wrong letters
  wordEl.innerHTML = `
  ${selectedWord
      .split('')
      .map(letter => `<span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `)
      .join('')}`
  //dosplay parts
  const innerWord = wordEl.innerText.replace(/\n/g, '')
  if (innerWord === selectedWord) {
    clearInterval(lunchChron)
    finalMessage.innerText = 'Félicitation, tu as gagné  😃 !'
    pop.style.backgroundColor = 'rgba(88, 243, 61)'
    setTimeout(() => { popup.style.display = 'flex' }, 900)
  }

}

//Update wong letters 

const updateWrongLettersEl = () => {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Fausses lettres</p>' : ''}
  ${wrongLetters.map(letter => `<span> ${letter} </span>`)}
  `
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length
    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })
  if (wrongLetters.length > 2) {
    fill.style.stroke = 'rgb(251, 162, 45)'
  }
  if (wrongLetters.length > 4) {
    fill.style.stroke = 'rgb(248, 9, 9)'
  }
  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    clearInterval(lunchChron)
    finalMessage.innerText = `Malheureusement tu as perdu ! 😕
    le mot est : "${selectedWord}"`
    pop.style.backgroundColor = 'red'
    popup.style.backgroundColor = 'rgba(243, 61, 61, 0.452)'
    setTimeout(() => { popup.style.display = 'flex' }, 900)
  }
}
// Show notifications 
// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
// keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }

  }
})

// Restart and play again 

playAgainBtn.addEventListener('click', () => {
  // empty arrays 
  correctLetters.splice(0)
  wrongLetters.splice(0)
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord()
  updateWrongLettersEl()
  popup.style.display = 'none'
  fill.style.stroke = '#fff'
  Realsec = 0
  sec = 0
  Realmin = 0
  min = 0
  lunchChron = setInterval(() => {
    chronoForSessionGlobal()
  }, 1000);
})
displayWord()