import { useState } from "react";
import LifeLine from "./components/LifeLine";
import { clsx } from "clsx";

function App() {
  //static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const totalLives = 10;

  // state values
  const [currentWord, setCurrentWord] = useState("ganesha");
  const [guessedLetters, setGuessedLetters] = useState(new Set());

  //derived values
  let wrongLetterCount = 0;
  let correctLettersCount = 0;
  let gameWon = false;
  let gameLost = false;
  let gameOver = false;

  for (const letter of guessedLetters) {
    if (!currentWord.includes(letter)) {
      wrongLetterCount += 1;
    }
  }

  for (const letter of currentWord) {
    if (guessedLetters.has(letter)) {
      correctLettersCount += 1;
    }
  }

  // console.log(`u hav used ${usedLives} lives out of ${totalLives}`)

  if (wrongLetterCount >= totalLives) {
    gameLost = true;
  } else if (correctLettersCount === currentWord.length) {
    gameWon = true;
  }

  gameOver = gameWon || gameLost;

  if (gameLost) {
    console.log("you have lost the game");
  } else if (gameWon) {
    console.log("you have won the game");
  }

  const handleKeyClick = (letter) => {
    setGuessedLetters((prevLetters) => {
      const newLetters = new Set(prevLetters);
      newLetters.add(letter);
      return newLetters;
    });
  };

  const guessedWordList = currentWord.split("").map((letter, index) => {
    return (
      <span key={index} className="guessed-char">
        {guessedLetters.has(letter) && letter.toUpperCase()}
      </span>
    );
  });

  const alphabetsList = alphabets.split("").map((letter) => {
    const isGuessed = guessedLetters.has(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      "keyboard-letter": !isGuessed,
    });

    // console.log("class for " + letter + " is " + className);
    return (
      <button
        className={className}
        key={letter}
        onClick={() => handleKeyClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <main>
        <header>
          <h1>Hangman Game:</h1>
          <p> You have {totalLives} lives to guess the correct word!</p>
        </header>

        {gameOver && (
          <section className="game-status" style={{backgroundColor :  gameWon ? "#10A95B" : "red"}}>
            <h2>{gameWon ? "You Won!!" : "You Lost!"}</h2>
            <p>{gameWon ? "Well Done!!" : "Try Again!"}</p>
          </section>
        )}

        <section className="game-chances-left">
          <LifeLine totalLives={totalLives} usedLives={wrongLetterCount} />
        </section>

        <section className="guessed-word">{guessedWordList}</section>

        <section className="keyboard">{alphabetsList}</section>

        <button className="new-game-button">New Game</button>
      </main>
    </>
  );
}

export default App;
