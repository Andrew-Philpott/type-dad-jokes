export class Game {
  constructor() {
    this.seconds = 0;
    this.characters = [];
    this.words = [];
    this.startTime;
    this.gameTime;
    this.timer;
    this.players = [];
    this.charactersIndex = 0;
    this.wordsIndex = 0;
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
    this.startTime = Math.floor(Date.now() / 1000);
  }
  setGameTime(time) {
    this.gameTime = time;
  }
  setParagraph(paragraph) {
    this.paragraph = paragraph;
  }
  setText(paragraph) {
    this.setInputtedCharacters([]);
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
  addMatchBool(char) {
    this.inputtedCharacters.push(char);
  }
  startGame() {
    this.round = false;
    this.setGameTime(0);
    this.setStartTime();
  }
  startTimer() {
    this.timer = setInterval(() => {
      this.updateGameTime();
    }, 1000);
  }
  clearTimer() {
    clearInterval(this.timer);
  }
  updateGameTime() {
    console.log(this.startTime + " start time");
    let timeNow = Math.floor(Date.now() / 1000);
    console.log(timeNow + " time now");
    let gameTime = timeNow - this.startTime;
    // console.log(gameTime + " Game time");
    this.setGameTime(gameTime);
    console.log(this.gameTime);
    // this.setMinutes(Math.floor(gameTime / 1000) / 60);
    this.setSeconds(Math.floor(gameTime / 1000) % 60);
  }
  checkWord() {
    let matches = [];
    let i = 0;
    while (
      this.characters[this.charactersIndex + i] !== " " &&
      this.charactersIndex + i >= 0
    ) {
      console.log(this.characters[this.charactersIndex + i]);
      matches.push(this.inputtedCharacters[this.charactersIndex + i]);
      i--;
    }
    let checkMatches = matches => matches.every(match => match === true);
    if (checkMatches) {
      this.wordsCorrect = this.wordsCorrect + 1;
    }
  }
  // checkGame() {
  //   if (this.charactersIndex === charactersCount) {
  //     this.round = true;
  //   }
  // }
  // checkWord() {
  checkCharacter(pushedKey) {
    if (this.charactersIndex === this.characters.length - 1) {
      console.log("End of game");
    } else {
      let charCodeAtIndex = this.characters[this.charactersIndex].charCodeAt(0);
      if (pushedKey === 32 && charCodeAtIndex === 32) {
        this.checkWord();
        this.addMatchBool(true);
      } else if (pushedKey === 32 && charCodeAtIndex !== 32) {
        this.addMatchBool(false);
      } else if (charCodeAtIndex !== pushedKey) {
        this.incrementErrors();
        this.addMatchBool(false);
      } else if (charCodeAtIndex === pushedKey) {
        this.addMatchBool(true);
      }
      this.incrementCharacterIndex();
    }
  }

  calculateScore() {
    // let minutes = this.gameTime / 60;
    // let seconds = this.gameTime % 60;
    let wordsCorrect = this.wordsCorrect;
    let wordsPerSecond = parseFloat(wordsCorrect / this.getGameTime());
    console.log(wordsPerSecond);
  }
  isRoundOver() {
    if (this.inputtedCharacters.length === this.characters.length) {
      return true;
    } else {
      return false;
    }
  }

  addPlayer(playerObj) {
    this.players.push(playerObj);
  }
}
