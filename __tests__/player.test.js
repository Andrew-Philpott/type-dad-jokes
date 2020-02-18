import { Player } from './../src/js/player';

describe("Player", () => {
    let newPlayer;

    beforeEach(() => {
        newPlayer = new Player("Barbara Blackburn");
    })

    test("Should expect object with a given name and 0 wpm and 0 cpm", () => {
        expect(newPlayer.name).toEqual("Barbara Blackburn");
        expect(newPlayer.wordsPerMinute).toEqual(0);
        expect(newPlayer.charsPerMinute).toEqual(0);
    });

    test("Should return our name Barbara Blackburn when getName functon is used", () => {
        expect(newPlayer.getName()).toEqual("Barbara Blackburn");
    })

    test("Should set wpm to 212 when we call setWordsPerMinute and return them 212 we call getWordsPerMinute", () => {
        newPlayer.setWordsPerMinute(212);
        expect(newPlayer.wordsPerMinute).toEqual(212);
        expect(newPlayer.getWordsPerMinute()).toEqual(212)
    })

    test("Should set cpm with a number when we call setCharactersPerMinute to what we give it and return that value with getCharactersPerMinute", () => {
        newPlayer.setCharactersPerMinute(420);
        expect(newPlayer.charsPerMinute).toEqual(420);
        expect(newPlayer.getCharactersPerMinute()).toEqual(420);
    })

    test("Should set errors with a number when we call setErrors and return that number with getErrors", () => {
        newPlayer.setErrors(69);
        expect(newPlayer.errors).toEqual(69);
        expect(newPlayer.getErrors()).toEqual(69);
    })
})