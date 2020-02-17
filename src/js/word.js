export class Word {
  constructor(word) {
    this.word = word;
    this.isCorrect = false;
    this.timeCompleted = 0;
  }
  getisCorrect() {
    return this.isCorrect;
  }
  setIsCorrecctToTrue() {
    this.isCorrect = true;
  }
  getTimeCompleted() {
    return this.timeCompleted;
  }
  setTimeCompleted(gameTime) {
    this.timeCompleted = gameTime;
  }
}