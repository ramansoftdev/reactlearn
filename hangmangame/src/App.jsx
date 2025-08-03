import { useState, useEffect } from "react";
import LifeLine from "./components/LifeLine";
import { clsx } from "clsx";
import Confetti from "react-confetti";

function App() {
  //static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const totalLives = 10;

  // state values
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordHint, setCurrentWordHint] = useState("");

  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [prevGuessLetter, setPrevGuessLetter] = useState("");

  //derived values
  let wrongLetterCount = currentWord
    ? [...guessedLetters].filter((letter) => !currentWord.includes(letter))
        .length
    : 0;
  let gameWon =
    currentWord &&
    currentWord.split("").every((letter) => guessedLetters.has(letter));
  let gameLost = currentWord && wrongLetterCount >= totalLives;
  let gameOver = (currentWord && gameWon) || gameLost;
  let prevGuessCorrect =
    currentWord &&
    prevGuessLetter !== "" &&
    currentWord.includes(prevGuessLetter);
  // console.log("prvious letter is " + prevGuessLetter + " and previous correct is " +  prevGuessCorrect)

  // functions

  const handleKeyClick = (letter) => {
    if (!currentWord) {
      return;
    }
    const newPrevGuess = letter;
    setPrevGuessLetter(newPrevGuess);
    setGuessedLetters((prevLetters) => {
      const newLetters = new Set(prevLetters);
      newLetters.add(letter.toUpperCase());
      return newLetters;
    });
  };

  const renderGameStatus = () => {
    if (gameWon) {
      return (
        <>
          <h2>You Won!!, play Again!</h2>
          <p>"Well Done!!</p>
        </>
      );
    } else {
      return (
        <>
          <h2>You Lost!</h2>
          <p>Try Again!</p>
        </>
      );
    }
  };

  const guessedWordList = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = guessedLetters.has(letter) || gameLost;
    const className = clsx(
      gameLost && !guessedLetters.has(letter) && "missed-letter"
    );

    // console.log(" currentword is " + currentWord + "guessed letter si " + [...guessedLetters] + "letter is "+ letter + " and should reveal is " + shouldRevealLetter)
    return (
      <span key={index} className={className}>
        {shouldRevealLetter && letter.toUpperCase()}
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
        disabled={gameOver || guessedLetters.has(letter)}
        aria-disabled={gameOver || guessedLetters.has(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const handleNewGameClick = () => {
    if (!gameOver) {
      return;
    }
    getRandomWord();
    setGuessedLetters(new Set());
    setPrevGuessLetter("");
  };

  const fetchWords = () => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((characters) => {
        // console.log("First character:", characters[0].actor);
        // console.log("all char are" + characters.map((character)=>character.name))
        // console.log("First character:", characters[0].alternate_names[0]);
        setWords(
          characters
            .filter((character) => character.alternate_names.length>0)
            .map((character) => [
              character.name.toUpperCase().replaceAll(" ", ""),
              character.alternate_names[0],
            ])
        );
      })
      .catch((err) => console.log("error api call " + err));
  };

  const getRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    setCurrentWord(words[index][0]);
    setCurrentWordHint(words[index][1]);
    console.log(
      // "current word is " + words[index][0] + " and hint is " + words[index][1]
    );
  };

  useEffect(fetchWords, []);

  return (
    <>
      <main>
        {gameWon && <Confetti numberOfPieces={1000} />}
        <header>
          <h1>Hangman Game</h1>
          <p>
            {" "}
            You have {totalLives} lives to guess this HARRYPOTTER character!
          </p>
        </header>

        {!gameOver && prevGuessLetter && (
          <section className="guess-message">
            {prevGuessLetter.toUpperCase()} is{" "}
            {prevGuessCorrect ? "correct!!" : "incorrect!"}
          </section>
        )}

        {gameOver && (
          <section
            className="game-status"
            style={{ backgroundColor: gameWon ? "#10A95B" : "#BA2A2A" }}
            aria-live="polite"
            role="status"
          >
            {renderGameStatus()}
          </section>
        )}

        <section className="game-chances-left">
          <LifeLine totalLives={totalLives} usedLives={wrongLetterCount} />
        </section>

        <section className="guessed-word">{guessedWordList}</section>

        {currentWordHint && (
          <section>
            <p className="hint">Hint: {currentWordHint}</p>
          </section>
        )}

        <section className="keyboard">{alphabetsList}</section>

        {gameOver && (
          <button onClick={handleNewGameClick} className="new-game-button">
            New Game
          </button>
        )}

        {!currentWord && (
          <button onClick={getRandomWord} className="new-word-button">
            Get New Word
          </button>
        )}
      </main>
    </>
  );
}

export default App;
