export class Player {
  constructor(name) {
    this.name = name;
    this.wordsPerMinute = 0;
    this.charsPerMinute = 0;
    this.errors = 0;
    this.inputtedCharacters = [];
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
  getInputtedCharacters() {
    return this.inputtedCharacters;
  }
  addCharacter(char) {
    this.getInputtedCharacters.push(char);
  }
  removeCharacter() {
    this.getInputtedCharacters.pop();
  }
  findCharacterAtIndex(index) {
    return this.getInputtedCharacters[index];
  }
}