export class Game {
  constructor() {
    this.seconds = 0;
    this.characters = [];
    this.words = [];
    this.startTime;
    this.gameTime;
    this.players = [];
    this.charactersIndex = 0;
    this.inputtedCharacters = [];
    this.paragraph = "";
    this.errors = 0;
    this.wordsCorrect = 0;
  }
  getErrors() {
    return this.errors;
  }
  incrementErrors() {
    this.errors++;
  }
  getSeconds() {
    return this.seconds;
  }
  setSeconds(seconds) {
    this.seconds = seconds;
  }
  getCharacters() {
    return this.characters;
  }
  setCharacters(paragraph) {
    this.characters = paragraph.split("");
  }
  findCharacterAtIndex() {
    return this.getCharacters[this.getCharacterIndex()];
  }
  getWords() {
    return this.words;
  }
  getGameTime() {
    return this.gameTime;
  }
  setWords(paragraph) {
    this.words = paragraph.split(" ");
  }
  getCharacterIndex() {
    return this.charactersIndex;
  }
  incrementCharacterIndex() {
    this.charactersIndex++;
  }
  decrementCharacterIndex() {
    this.charactersIndex--;
  }
  getStartTime() {
    return this.startTime;
  }
  setStartTime() {
    this.startTime = Math.floor(Date.now()/1000);
  }
  setGameTime(time) {
    this.gameTime = time;
  }
  getParagraph() {
    return this.paragraph;
  }
  setParagraph(paragraph) {
    this.paragraph = paragraph;
  }
  setText(paragraph) {
    this.setParagraph("");
    this.setInputtedCharacters("");
    this.setCharacters("");
    this.setWords("");
    this.setCharacters(paragraph);
    this.setWords(paragraph);
    this.setParagraph(paragraph);
  }
  getInputtedCharacters() {
    return this.inputtedCharacters;
  }
  setInputtedCharacters(characters) {
    return (this.inputtedCharacters = characters);
  }
  addMatchBool(match) {
    this.getInputtedCharacters().push(match);
  }

  // setWordCompletionTime(word) {
  // }
  // getWordCompletionTime(word) {
  // }
  startGame() {
    this.round = false;
    this.setGameTime(0);
    this.setStartTime();
    this.startTimer();
  }
  startTimer() {
    console.log(this.startTime + " start time")
    let timeNow = Math.floor(Date.now()/1000);
    console.log(timeNow + " time now");
    let gameTime = timeNow - this.startTime;
    console.log(gameTime + " Game time");
    this.setGameTime(gameTime);
    // this.setMinutes(Math.floor(gameTime / 1000) / 60);
    this.setSeconds(Math.floor(gameTime / 1000) % 60);
    setTimeout(this.startTimer(), 500);
  }

    checkWord() {
    let reverseWord = [];
    let i = 0;
    while(characters[(charactersIndex + i)] !== " " && ((charactersIndex + i) < 0)) {
      console.log(characters[(charactersIndex + i)]);
      reverseWord.push(characters[charactersIndex]);
      i--;
    }
    let word = reverseWord.reverse().join("");
    if(word === wor) {
      wordsCorrect = wordsCorrect + 1;
    }
  }
  // checkGame() {
  //   if (this.charactersIndex === charactersCount) {
  //     this.round = true;
  //   }
  // }

  // function checkWord() {
  //   let reverseWord = [];
  //   let i = 0;
  //   while(characters[(charactersIndex + i)] !== " " && ((charactersIndex + i) >= 0)) {
  //   console.log(characters[(charactersIndex + i)]);
  //     reverseWord.push(characters[charactersIndex]);
  //     i--;
  //   }
  //   let word = reverseWord.reverse().join("");
  //   console.log(word);
  //   if(word === wor) {
  //     wordsCorrect = wordsCorrect + 1;
  //   }
  // }


  checkCharacter(pushedKey) {
    if(this.characters[this.charactersIndex] !== pushedKey) {
      this.incrementErrors();
      this.setInputtedCharacters(false);
    } else if(this.characters[this.charactersIndex] === " ") {
      this.checkWord();
    }
    incrementCharacterIndex();
    console.log(`checked ${character}`);
  }
  checkCharacter(character) {
    console.log(`checked ${character}`);
  }

  isRoundOver() {
    return false;
  }

  addPlayer(playerObj) {
    this.players.push(playerObj);
  }
}
