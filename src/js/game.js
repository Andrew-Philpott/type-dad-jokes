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
    this.startTime = Date.now();
  }
  setGameTime(gameTime) {
    this.gameTime = gameTime;
  }
  setText(paragraph) {
    this.setInputtedCharacters("");
    this.setCharacters("");
    this.setWords("");
    this.setCharacters(paragraph);
    this.setWords(paragraph);
  }
  getInputtedCharacters() {
    return this.inputtedCharacters;
  }
  setInputtedCharacters(characters) {
    return (this.inputtedCharacters = characters);
  }
  addCharacter(char) {
    this.getInputtedCharacters.push(char);
  }
  removeCharacter() {
    this.getInputtedCharacters.pop();
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
    let timeNow = Date.now();
    let gameTime = timeNow - this.getStartTime();
    this.setGameTime(gameTime);
    this.setMinutes(Math.floor(gameTime / 1000) / 60);
    this.setSeconds(Math.floor(gameTime / 1000) % 60);
    let timer = setTimeout(this.startTimer, 500);
    return timer;
  }

  // checkGame() {
  //   if (this.charactersIndex === charactersCount) {
  //     this.round = true;
  //   }
  // }

  checkCharacter(character) {
    console.log(`checked ${character}`);
  }

  isRoundOver() {
    return false;
  }
}
