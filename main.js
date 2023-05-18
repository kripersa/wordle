import { alphabet } from "./alphabet.js";
import { fiveLetterWordsArray } from "./fiveletterwords.js";

``;
document.addEventListener("keydown", onKeyPress);

let currentWord = [];
let currentRow = 0;

let secretWord = "funny";
// fiveLetterWordsArray[Math.floor(Math.random() * fiveLetterWordsArray.length)];
console.log(secretWord);
function onKeyPress(e) {
  console.log(currentRow);
  checkPressedKey(e.key);
  clearTheBoxes(currentWord);

  fillBoxesWithCurrentWord(currentWord);
  console.log(currentWord);
}

function checkPressedKey(pressedKey) {
  if (pressedKey === "Enter") {
    if (currentWord.length === 5) {
      checkSecretWord(currentWord);
      currentRow += 1;
      currentWord = [];
    } else {
      console.error("Word should be five letters ");
    }
  } else {
    updateCurrentWord(pressedKey);
  }
}

function checkSecretWord(currentWord) {
  let stingifiedCurrentWord = currentWord.join("");
  if (stingifiedCurrentWord === secretWord)
    return console.log("you guessed the word");
  let guessedLetters = "-----";
  guess(stingifiedCurrentWord);
  checkIncludes(stingifiedCurrentWord);

  function checkIncludes(stingifiedCurrentWord) {
    let splited = guessedLetters.split("");
    for (let i = 0; i < guessedLetters.length; i++) {
      if (secretWord.includes(stingifiedCurrentWord[i])) {
        splited[i] = "0";
        splited.join("");
      }
    }
    guessedLetters = splited.join("");
  }

  function guess(stingifiedCurrentWord) {
    let splited = guessedLetters.split("");
    for (let i = 0; i < guessedLetters.length; i++) {
      if (secretWord.includes(stingifiedCurrentWord[i])) {
        splited[i] = "X";
        splited.join("");
      }
    }

    guessedLetters = splited.join("");
    console.log(splited.join(""));
  }
}

function fillBoxesWithCurrentWord(arr) {
  let boxes = Array.from(
    document.getElementsByTagName("section")[currentRow].children
  );

  arr.forEach((element, i) => (boxes[i].innerText = element));
}
function clearTheBoxes(arr) {
  let boxes = Array.from(
    document.getElementsByTagName("section")[currentRow].children
  );

  boxes.forEach((element) => (element.innerText = ""));
  arr.forEach((element, i) => (boxes[i].innerText = element));
}
function updateCurrentWord(letter) {
  if (letter === "Backspace") {
    currentWord.pop();
  } else {
    if (alphabet.includes(letter)) {
      if (currentWord.length < 5) {
        currentWord.push(letter);
      }
    }
  }
}
