import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useState } from "react";

const generateAllNewDice = () => {
  console.log("generating new dice rolls for 10 dice");
  let dice = [];
  for (let itr = 1; itr <= 10; itr++) {
    dice.push({
      id: nanoid(),
      value: 1 + Math.floor(6 * Math.random()),
      isHeld: false,
    });
  }
  return dice;
};

export default function Main() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const rollDice = () => {
    if (gameWon) {
      setDice(generateAllNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: 1 + Math.floor(6 * Math.random()) }
        )
      );
    }
  };

  const hold = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) =>
        id === die.id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    );
  };

  const newGame = () => {
    setDice(generateAllNewDice());
  };

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  return (
    <main>
      {gameWon && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((item) => {
          return (
            <Die
              key={item.id}
              value={item.value}
              isHeld={item.isHeld}
              hold={() => hold(item.id)}
            />
          );
        })}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "ROLL"}
      </button>
    </main>
  );
}
