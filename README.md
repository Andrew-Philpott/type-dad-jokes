# Type Dad Jokes

#### A typing speed game, 02.20.2020\_

#### By _**Andrew Philpott, Sasa Schwartz, Jiwon Han, Jack Dunning**_

## Description

This application allows you to see how fast you're typing, as well as race against your friends. You are provided with 100 words worth of dad jokes as you type. As you type, the text will shift and change color to display which letters you typed correctly and incorrectly. You can correct your errors within a word, but once you complete a word you can't go back! When you finish typing, the game will display your words per minute, characters per minute, and number of errors.

## General division of responsibilities
* Andrew: Class construction for Game and Player files, CSS styling
* Sasa: Event listeners and handlers, dynamic positioning and color-coding of text display
* Jack: Jest testing, HTML construction, traffic light animation
* Jiwon: API utilization, visual interactive keyboard

  Team members contributed beyond their areas of responsibility. The areas listed above outline the largest contributors in each part of the project.

## Specs

- _Spec: The application should not show the start game screen if a name isn't entered in the "Enter your name box" and submit is clicked._

  - Input: "" and click submit
  - Output: "Please fill out this field"

- _Spec: The application should show the start game screen upon entering a name into "Enter your name box"._

  - Input: "Andrew" and click submit
  - Output: Start game screen is displayed with "Andrew" at the top, "Start Race" and "Change Text" buttons, and a string of words in the middle of the screen.

- _Spec: The application should show an animation of a traffic light when you click the "Start Race" button_

  - Input: Click the "Start Race" button
  - Output: Screen will turn black and an animation of a traffic light will play for 3 seconds with a "Ready, Set, Go!" countdown.

- _Spec: The application should start the timer after the traffic light countdown_

  - Input: Click the "Start Race" button, watch traffic light countdown
  - Output: Timer will start counting up from zero.

- _Spec: The application should track the users words per minute after the traffic light countdown_

  - Input: Click the "Start Race" button, watch traffic light countdown
  - Output: Words/Min counter will go up when you complete a word

- _Spec: The application should track the users characters per minute after the traffic light countdown_

  - Input: Click the "Start Race" button, watch traffic light countdown
  - Output: Characters/Min counter will go up when you complete a character

- _Spec: The application should track the users errors after the traffic light countdown_

  - Input: Click the "Start Race" button, watch traffic light countdown
  - Output: Errors counter will go up when you miss type a character

- _Spec: The application should track the users keypresses to interact with string of words in the middle after the traffic light countdown_

  - Input: Press key "A"
  - Output: If the current character on the string is "a" it will grey out and increase your Chracters/Min count, else if it isn't "A" it will turn the character red and increase your Errors counter.

- _Spec: The application should track the users keypresses to interact with keyboard at the bottom after the traffic light countdown_

  - Input: Press key "A"
  - Output: The "A" key on the keyboard at the bottom will press in and turn down it's opacity.

- _Spec: The application should stop timer, stop tracking keypresses, Words/Min, Characters/Min and errors when the string in the middle is completed_

  - Input: All characters in the string have been typed
  - Output: Game ends, keypresses are no longer tracked and users stats get displayed.

- _Spec: The application should track the users Time and display it when the game ends_

  - Input: The string in the middle ends because the user typed it correctly or incorrectly
  - Output: Time: how much time you spent typing.

- _Spec: The application should track the users Words/Min and display it when the game ends_

  - Input: The string in the middle ends because the user typed it correctly or incorrectly
  - Output: Words/Min: However many words you typed completely correct.

- _Spec: The application should track the users Characters/Min and display it when the game ends_

  - Input: The string in the middle ends because the user typed it correctly or incorrectly
  - Output: Characters/Min: However many characters you typed completely correct.

- _Spec: The application should track the users Errors and display it when the game ends_
  - Input: The string in the middle ends because the user typed it correctly or incorrectly
  - Output: Errors: However many characters you typed completely incorrect.

## Setup/Installation Requirements

- Clone this repository.
- \$ npm install
- \$ npm run start

## Known Bugs

- No known bugs

## Support and contact details

- Issues or concerns? Contact us at andrewphilpott92@gmail.com

## Technologies Used

- Html
- CSS
- JavaScript
- Babel
- Dad Jokes API

### License

Copyright (c) 2020 **_Andrew Philpott, Sasa Schwartz, Jiwon Han, Jack Dunning_**

_This software is licensed under the MIT license._
