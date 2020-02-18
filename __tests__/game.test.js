import { Game } from './../src/js/game';

describe("Game", () => {
    let newGame;

    beforeEach(() => {
        newGame = new Game();
    })

    test("Should return base constructor values", () => {
        expect(newGame.characters).toEqual([])
        expect(newGame.words).toEqual([])
        expect(newGame.startTime).toEqual()
        expect(newGame.gameTime).toEqual(0)
        expect(newGame.timer).toEqual()
        expect(newGame.players).toEqual([])
        expect(newGame.charactersIndex).toEqual(0)
        expect(newGame.wordsIndex).toEqual(0)
        expect(newGame.inputtedCharacters).toEqual([])
        expect(newGame.paragraph).toEqual("")
        expect(newGame.errors).toEqual(0)
        expect(newGame.wordsCorrect).toEqual(0)
    })

    test("Should return 0 when getErrors is called and return one when we call incrementErrors", () => {
        expect(newGame.getErrors()).toEqual(0);
        newGame.incrementErrors();
        expect(newGame.errors).toEqual(1);
    })

    test("Should return [] when we call getCharacters and setCharacters should return an array with hello splitted", () => {
        expect(newGame.getCharacters()).toEqual([]);
        newGame.setCharacters("Hello");
        expect(newGame.characters).toEqual(["H", "e", "l", "l", "o"]);
    })

    test("Should return [] when we call getWords method and setWords should return an array with hello world splitted", () => {
        expect(newGame.getWords()).toEqual([])
        newGame.setWords("Hello World");
        expect(newGame.words).toEqual(["Hello", "World"])
    })

    test("Should return 0 when getCharacterIndex is called and should increment and decrement with additional functions", () => {
        expect(newGame.getCharacterIndex()).toEqual(0);
        newGame.incrementCharacterIndex()
        expect(newGame.charactersIndex).toEqual(1);
        newGame.decrementCharacterIndex();
        expect(newGame.charactersIndex).toEqual(0);
    })

    test("Should return 0 when we call getStartTime and setStartTimer to the correct time", () => {
        expect(newGame.getStartTime()).toEqual();
        newGame.setStartTime();
        expect(newGame.getStartTime()).toEqual(Math.floor(Date.now() / 1000));
    })

    test("Should set this.paragraph to our parameter", () => {
        newGame.setParagraph("Hello World");
        expect(newGame.paragraph).toEqual("Hello World");
    })

    test("Should clear inputtedChracters, characters and word values and then set them based on our paragraph", () => {
        newGame.setText("Not Hello World");
        // Clears values from above method and sets below method values
        newGame.setText("Hello World");
        expect(newGame.characters).toEqual(["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]);
        expect(newGame.words).toEqual(["Hello", "World"]);
        expect(newGame.paragraph).toEqual("Hello World");
    })

    test("Should return inputted characters in our object with getInputtedCharacters and setInputtedCharacters should replace this.inputtedCharacters with what we give to it", () => {
        expect(newGame.getInputtedCharacters()).toEqual([]);
        expect(newGame.setInputtedCharacters("a")).toEqual("a");
        expect(typeof newGame.setInputtedCharacters("a")).toEqual("string");
        newGame.setInputtedCharacters("a")
        expect(typeof newGame.inputtedCharacters).toEqual("string")//It's a string and not a array because set just replaces the value instead of pushing new value to the array
        //addMatchBool will push our char to array later in our code as a callback
    })

    test("Should push a boolean to our inputtedCharacters array when when give it boolean", () => {
        newGame.addMatchBool(true);
        expect(newGame.inputtedCharacters[0]).toEqual(true);
        newGame.addMatchBool(false);
        expect(newGame.inputtedCharacters).toEqual([true, false])
        newGame.addMatchBool("Hello");
        expect(newGame.inputtedCharacters).toEqual([true, false, "Hello"]);
        //Can push other data besides booleans
    })

    test("Should set round, gameTime and startTime values to false, 0 and a value based on Date.now()", () => {
        newGame.startGame();
        expect(newGame.round).toEqual(false);
        expect(newGame.gameTime).toEqual(0);
        expect(newGame.startTime).toEqual(Math.floor(Date.now() / 1000));
    })

    test("Should set our gameTime and seconds with updateGameTime to be used in our startTimer function", () => {
        newGame.setStartTime();
        newGame.updateGameTime();
        expect(newGame.gameTime).toEqual(0);
        expect(newGame.seconds).toEqual(0);
        //Idk why these values are 0, will come back to it
    })

    test("Should loop over our characters, look for a space and then say every char before that space is apart of a word", () => {
        newGame.setCharacters("Hello");
        newGame.inputtedCharacters = ["H", "e", "l", "l", "o"];
        newGame.checkWord()
        expect(newGame.wordsCorrect).toEqual(1);

        // Even when there are 2 words in the array it returns 1 because it checks only before a space
        newGame.wordsCorrect = 0;
        newGame.setCharacters("Hello World");
        newGame.inputtedCharacters = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"];
        newGame.checkWord()
        expect(newGame.wordsCorrect).toEqual(1);
    })

    test("Should check if a keypressed by the user is the correct one being displayed and push true or false and increase our error count if it is false when we call checkCharacter", () => {
        newGame.characters = ["a"]
        newGame.checkCharacter(97);
        expect(newGame.inputtedCharacters[0]).toEqual(true);
        expect(newGame.errors).toEqual(0);

        newGame.characters = ["a"]
        newGame.charactersIndex = 0;
        newGame.checkCharacter(98);
        expect(newGame.errors).toEqual(1);
    })

})