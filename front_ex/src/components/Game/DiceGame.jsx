import React, { useState } from 'react';
import '../../css/game/DiceGame.css';

function DiceGame() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [p1Score, setP1Score] = useState('');
  const [p2core, setP2Score] = useState('');
  const [diceNum, setDiceNum] = useState('');

  return (
    <div className="dice-game-container">
      <div>
        <input
          placeholder="player1"
          value={player1}
          onChange={(e) => {
            setPlayer1(e.target.value);
          }}
        />
        <input
          placeholder="player2"
          value={player2}
          onChange={(e) => {
            setPlayer2(e.target.value);
          }}
        />
      </div>
      <main>
        <div className="player-container">
          <section class="player player1 player-active">
            <h2 class="name" id="name--0">
              {player1}
            </h2>
            <p class="score" id="score--0">
              43
            </p>
            <div class="current">
              <p class="current-label">Current</p>
              <p class="current-score" id="current--0">
                0
              </p>
            </div>
          </section>
          <section class="player player2">
            <h2 class="name" id="name--1">
              {player2}
            </h2>
            <p class="score" id="score--1">
              24
            </p>
            <div class="current">
              <p class="current-label">Current</p>
              <p class="current-score" id="current--1">
                0
              </p>
            </div>
          </section>
        </div>
        <img src="/img/dice-5.png" alt="dice" class="dice" />
        <button class="btn btn--new">🔄 New game</button>
        <button class="btn btn--roll">🎲 Roll dice</button>
        <button class="btn btn--hold">📥 Hold</button>
      </main>
    </div>
  );
}

export default DiceGame;
