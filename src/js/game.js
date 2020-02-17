export class Game {
  constructor() {
    this.seconds = 0;
    this.characters = [];
    this.words = [];
    this.startTime;
    this.gameTime;
    this.players = [];
    this.round = false;
    this.charactersIndex = 0;
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
    this.setCharacters("");
    this.setWords("");
    this.setCharacters(paragraph);
    this.setWords(paragraph);
  }
  setWordCompletionTime(word) {
  }
  getWordCompletionTime(word) {
  }
  startGame() {
    this.setGameTime(0);
    this.setStartTime();
    this.startTimer();
  }
  startTimer() {
    let timeNow = Date.now();
    let gameTime = timeNow - this.getStartTime();
    this.setGameTime(gameTime);
    this.setMinutes((Math.floor((gameTime/1000)))/60);
    this.setSeconds((Math.floor((gameTime/1000)))%60);
    let timer = setTimeout(this.startTimer, 500);
    return timer;
  }
  checkGame() {
    if(this.charactersIndex === charactersCount) {
      this.round = true;
    }
  }
}

