import { alphabet } from "./alphabet.js";
import { fiveLetterWordsArray } from "./fiveletterwords.js";

document.addEventListener("keydown", onKeyPress);

let currentWord = [];
let currentRow = 0;
let atempt = 0;

let secretWord =
  fiveLetterWordsArray[Math.floor(Math.random() * fiveLetterWordsArray.length)];
console.log(secretWord);
function onKeyPress(e) {
  checkPressedKey(e.key);
  gameOver();
  clearTheBoxes(currentWord);
  fillBoxesWithCurrentWord(currentWord);
}

function checkPressedKey(pressedKey) {
  if (pressedKey === "Enter") {
    if (currentWord.length === 5) {
      checkSecretWord(currentWord);
      currentRow += 1;
      atempt += 1;
      currentWord = [];
      console.log(atempt);
    } else {
      console.error("Word should be five letters ");
    }
  } else {
    updateCurrentWord(pressedKey);
  }
}

function checkSecretWord(currentWord) {
  let h1 = document.querySelector("#h1");
  let h2 = document.querySelector("#h2");
  let h3 = document.querySelector("#h3");
  let winner = document.querySelector(".winner");
  let guessedLetters = "-----";
  let stingifiedCurrentWord = currentWord.join("");
  if (stingifiedCurrentWord === secretWord) {
    h1.style.display = "none";
    h2.innerText = "Congratulations";
    h3.innerText = `Secret word was : ${secretWord}`;
    winner.style.visibility = "visible";

    console.log(winner);
    guessedLetters = "XXXXX";
    giveBoxesColors(guessedLetters);
    // h2.innerText = "Congratulations"
    return console.log("you guessed the word");
  }

  checkIncludes(stingifiedCurrentWord);
  guess(stingifiedCurrentWord);
  incoretWord(stingifiedCurrentWord);

  function checkIncludes(stingifiedCurrentWord) {
    let splited = guessedLetters.split("");

    for (let i = 0; i < guessedLetters.length; i++) {
      if (secretWord.includes(stingifiedCurrentWord[i])) {
        splited[i] = "0";
        splited.join("");
      }
    }
    guessedLetters = splited.join("");
    console.log(guessedLetters);
  }

  function guess(stingifiedCurrentWord) {
    let splited = guessedLetters.split("");
    for (let i = 0; i < guessedLetters.length; i++) {
      if (
        stingifiedCurrentWord[i] === secretWord[i] &&
        fiveLetterWordsArray.includes(stingifiedCurrentWord)
      ) {
        splited[i] = "X";
        splited.join("");
      }
    }

    guessedLetters = splited.join("");
    giveBoxesColors(guessedLetters);
    console.log(guessedLetters);
  }
  function incoretWord(stingifiedCurrentWord) {
    if (!fiveLetterWordsArray.includes(stingifiedCurrentWord)) {
      guessedLetters = "";
      currentWord = currentWord;
      currentRow--;
      atempt--;

      alert("Incorect Word");
    }
  }
}
function giveBoxesColors(guessedLetters) {
  let stingifiedCurrentWord = currentWord.join("");
  if (fiveLetterWordsArray.includes(stingifiedCurrentWord)) {
    let boxes = Array.from(
      document.getElementsByTagName("section")[currentRow].children
    );
    let splited = guessedLetters.split("");
    console.log(guessedLetters);

    for (let m = 0; m < 5; m++) {
      if (splited[m] === "X") {
        boxes[m].classList.add("right");
      }
      if (splited[m] === "-") {
        boxes[m].classList.add("empty");
      }
      if (splited[m] === "0") {
        boxes[m].classList.add("include");
      }
    }
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

function gameOver() {
  let h1 = document.querySelector("#h1");
  let h2 = document.querySelector("#h2");
  let h3 = document.querySelector("#h3");
  let winner = document.querySelector(".winner");
  if (atempt === 6) {
    h1.style.display = "none";
    h2.innerText = "Unfortunately , you  loose";
    h3.innerText = `Secret word was : ${secretWord}`;
    winner.style.visibility = "visible";
    console.log(atempt);
  }
}
