export class Game {
  constructor() {
    this.seconds = 0;
    this.minutes = 0
    this.characters = [];
    this.charactersCount = 0
    this.words = [];
    this.wordsCount = 0;
    this.startTime;
    this.gameTime;
    this.players = [];
    this.round = false;
  }
  getSeconds() {
    return this.seconds;
  }
  setSeconds(seconds) {
    this.seconds = seconds;
  }
  getMinutes() {
    return this.minutes;
  }
  setMinutes(minutes) {
    this.minutes = minutes;
  }
  getCharactersCount() {
    return this.charactersCount;
  }
  setCharactersCount() {
    this.charactersCount = this.characters.length;
  }
  getWordsCount() {
    return this.wordsCount;
  }
  setWordsCount(words) {
    this.wordsCount = this.words.length;
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
  getGameTime()
  setText(paragraph) {
  }
  setWordCompletionTime(word) {
  }
  getWordCompletionTime(word) {
  }
  resetTimer() {
  }

  startGame(paragraph) {
    this.setCharacters(paragraph);
    this.setCharactersCount();
    this.setWords(paragraph);
    this.setWordsCount();
    this.setStartTime();
    this.startTimer();
  }
  startTimer() {
    let timeNow = Date.now();
    this.gameTime = timeNow - this.getStartTime();
    this.setMinutes()
    // localStorage.setItem
  }
}

