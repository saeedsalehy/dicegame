'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //'El' for element
const score1El = document.getElementById('score--1'); //'El' for element
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// pos 0 is total score of player 1 and pos 2 is total score of player 2
// to store current values that  we set to application and it get update and updte
// to understand wich player is playing at the moment
//player num 1 =0
//player num 2 =1

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //
  score0El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //
  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if activePlayer === 0 bood 1 esh kon va agar activePlayer ===1 bood 0 esh kon
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
init();

//rolling dice
btnRoll.addEventListener('click', function () {
  // 1. generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (playing) {
    // 2. display dic
    diceEl.classList.remove('hidden'); //it shows the image of dice
    diceEl.src = `dice-${dice}.png`; //select a pic from dice pics randomly use src like html
    console.log(dice);

    // 3. chek for rolled 1: if true switch to next player
    if (dice !== 1) {
      //dice not 1 here riht now
      //the condition is about when dice gets 1
      //add dice to the current score when its not 1
      currentScore += dice; // in first current score is 0 we roll the dice like 6 and this 6
      //+ to 0(current score) and it get stored
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // it says current score is for the player //that playing at te moment (current--0 for //player 1 and current--1 is for player 2 but dynamicly) //va bebin active player kodome va meghdare jadido behesh ezafe kon
    } else {
      //dice is 1
      //player switch
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 200) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
