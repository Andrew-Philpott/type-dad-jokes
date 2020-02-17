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
  getErrors() {
    return this.errors;
  }
  incrementErrors() {
    this.errors++;
  }
}