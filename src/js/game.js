export class Game {
  constructor() {
    this.seconds = 0;
    this.characters = [];
    this.words = [];
    this.startTime;
    this.gameTime;
    this.players = [];
    this.round = false;
    this.errors = 0;
    this.inputtedCharacters = [];
  }
  getErrors() {
    return this.errors;
  }
  incrementErrors() {
    this.errors++;
  }
  getInputtedCharacters() {
    return this.inputtedCharacters;
  }
  getSeconds() {
    return this.seconds;
  }
  setSeconds(seconds) {
    this.seconds = seconds;
  }
  get charactersCount() {
    return this.characters.length;
  }
  get wordsCount() {
    return this.words.length;
  }
  setCharacters(paragraph) {
    this.characters = paragraph.split("");
  }
  setWords(paragraph) {
    this.words = paragraph.split(" ");
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
    this.setCharacters("");
    this.setWords("");
    this.setCharacters(paragraph);
    this.setWords(paragraph);
  }
  //setWordCompletionTime(word) {
  //}
  //getWordCompletionTime(word) {
  //}
  startGame() {
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
}
