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

  setCharactersPerMinute(cpm) {
    this.charsPerMinute = cpm;
  }

  setErrors(errors) {
    this.errors = errors;
  }
}