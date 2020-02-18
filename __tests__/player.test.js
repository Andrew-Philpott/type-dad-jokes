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
})