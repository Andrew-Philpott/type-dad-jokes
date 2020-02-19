import { Word } from './../src/js/word';
import { exportAllDeclaration } from '@babel/types';

describe("Word", () => {
    let newWord;

    beforeEach(() => {
        newWord = new Word("bird");
    })

    test("Should return base contructor values word, isCorrect and timeCompleted and their types", () => {
        expect(newWord.word).toEqual("bird");
        expect(typeof newWord.word).toEqual("string");
        expect(newWord.isCorrect).toEqual(false);
        expect(typeof newWord.isCorrect).toEqual("boolean")
        expect(newWord.timeCompleted).toEqual(0);
        expect(typeof newWord.timeCompleted).toEqual("number")
    })

    test("Should set value to true and get isCorrect values with setIsCorrectToTrue and getIsCorrect", () => {
        expect(newWord.getIsCorrect()).toEqual(false); // isCorrect = false
        newWord.setIsCorrecctToTrue();                 // Setting to true
        expect(newWord.isCorrect).toEqual(true);       // isCorrect = true, now
        expect(newWord.getIsCorrect()).toEqual(true);
    })

    test("Should set timeCompleted value to a number when setTimeCompleted is called and return that number when you call getTimeCompleted", () => {
        expect(newWord.timeCompleted).toEqual(0);
        expect(newWord.getTimeCompleted()).toEqual(0);
        newWord.setTimeCompleted(69);
        expect(newWord.timeCompleted).toEqual(69);
        expect(newWord.getTimeCompleted()).toEqual(69);
    })
})