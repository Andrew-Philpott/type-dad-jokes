import { Player } from "./player.js";

export class Game {
  constructor() {
    this.characters = [];
    this.words = [];
    this.startTime;
    this.gameTime = 0;
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
  resetCharacterIndex() {
    this.charactersIndex = 0;
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
    this.charactersIndex = 0;
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
    let timeNow = Math.floor(Date.now() / 1000);
    let gameTime = timeNow - this.startTime;
    this.setGameTime(gameTime);
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

  checkCharacter(pushedKey) {
    if (pushedKey === 8 && this.charactersIndex > 0) {
      this.decrementCharacterIndex();
      this.inputtedCharacters.pop();
    } else {
      if (this.charactersIndex < this.characters.length) {
        let charCodeAtIndex = this.characters[this.charactersIndex].charCodeAt(
          0
        );
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
  }
  calculateScore(player) {
    if (player instanceof Player) {
      player.setWordsPerMinute(this.calculateWordsPerMintue());
      player.setCharactersPerMinute(this.calculateCharactersPerMintue());
      player.setErrors(this.getErrors());
    }
  }
  calculateWordsPerMintue() {
    let wordsPerMinute = parseFloat((this.wordsCorrect / this.gameTime) * 60);
    return wordsPerMinute;
  }
  calculateCharactersPerMintue() {
    let numberOfCorrectMatches = 0;
    let charactersPerMinute = 0;
    for (let i = 0; i < this.inputtedCharacters.length; i++) {
      if (this.inputtedCharacters[i]) {
        numberOfCorrectMatches = numberOfCorrectMatches + 1;
      }
    }
    if (numberOfCorrectMatches === 0) {
      return 0;
    } else {
      charactersPerMinute = parseFloat(
        (numberOfCorrectMatches / this.gameTime) * 60
      );
    }
    return charactersPerMinute;
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
