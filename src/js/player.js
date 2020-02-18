export class Player {
  constructor(name) {
    this.name = name;
    this.wordsPerMinute = 0;
    this.charsPerMinute = 0;
    this.errors = 0;
  }
  getName() {
    return this.name;
  }

  setWordsPerMinute(wpm) {
    this.wordsPerMinute = wpm;
  }

  getWordsPerMinute() {
    return this.wordsPerMinute;
  }

  setCharactersPerMinute(cpm) {
    this.charsPerMinute = cpm;
  }

  getCharactersPerMinute() {
    return this.getCharactersPerMinute;
  }

  setErrors(errors) {
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}
