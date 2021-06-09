'use strict';

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnReset = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores;
let stateGame, currentScore, activePlayer;
// Condiciones iniciales.
const init = function () {
  // Estados iniciales o especie de interruptores que hay que dejar por fuera de los eventos.
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stateGame = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// funciones repetidas
const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice Función.
btnRoll.addEventListener('click', function () {
  // Se puede jugar o no?
  if (stateGame === true) {
    //  1 -Generate a new dice roll - generar una nueva tirada
    const dice = Math.trunc(Math.random() * 6) + 1;

    console.log(dice);

    // 2- Mostra tirada en pantalla  - 'dice' o dado in display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //  Cuando el número del dado es '1';
    if (dice !== 1) {
      //   añadir score actual
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; /* falta crear el la varioacion en jugador 1 y 2 por turnno */
      // current0El.textContent = currentScore;
    } else {
      //   Cambiar de player cuando "the dice sea 1"
      changePlayer();
    }
  }
});

// Otro evento    'HOLD'
btnHold.addEventListener('click', function () {
  // Se puede jugar o no?
  if (stateGame === true) {
    // 1- Agregar al score actual la suma del jugador activo
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // explicacion => scores[1] = score[1] + currentScore;
    // 2- Chequear si el jugador mo ha ganado aún => SCORE > 100;
    if (scores[activePlayer] >= 30) {
      // IF = SI - Finalizar el juego
      stateGame = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // cambiar de jugador
      changePlayer();
    }
  }
});

// otro evento => reiniciar el juego.
btnReset.addEventListener('click', init);
