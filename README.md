# _TypingGame_
#### _Typing speed game_, 02.17.2020_
#### By _**Andrew Philpott, Sasa Schwartz, Jiwon Han, Jack Dunning**_
## Description
_This application is for checking your typing speed._

## Specs
* _Spec: The application should not show the start game screen if a name isn't entered in the "Enter your name box" and submit is clicked._
  * Input: "" and click submit 
  * Output: "Please fill out this field"

* _Spec: The application should show the start game screen upon entering a name into "Enter your name box"._
  * Input: "Andrew" and click submit
  * Output: Start game screen is displayed with "Andrew" at the top, "Start Race" and "Change Text" buttons, and a string of words in the middle of the screen.

* _Spec: The application should show an animation of a traffic light when you click the "Start Race" button_
  * Input: Click the "Start Race" button
  * Output: Screen will turn black and an animation of a traffic light will play for 3 seconds with a "Ready, Set, Go!" countdown.

* _Spec: The application should start the timer after the traffic light countdown_
  * Input: Click the "Start Race" button, watch traffic light countdown
  * Output: Timer will start counting up from zero.

* _Spec: The application should track the users words per minute after the traffic light countdown_
  * Input: Click the "Start Race" button, watch traffic light countdown
  * Output: Words/Min counter will go up when you complete a word

* _Spec: The application should track the users characters per minute after the traffic light countdown_
  * Input: Click the "Start Race" button, watch traffic light countdown
  * Output: Characters/Min counter will go up when you complete a character

* _Spec: The application should track the users errors after the traffic light countdown_
  * Input: Click the "Start Race" button, watch traffic light countdown
  * Output: Errors counter will go up when you miss type a character

* _Spec: The application should track the users keypresses to interact with string of words in the middle after the traffic light countdown_
  * Input: Press key "A"
  * Output: If the current character on the string is "a" it will grey out and increase your Chracters/Min count, else if it isn't "A" it will turn the character red and increase your Errors counter.

* _Spec: The application should track the users keypresses to interact with keyboard at the bottom after the traffic light countdown_
  * Input: Press key "A"
  * Output: The "A" key on the keyboard at the bottom will press in and turn down it's opacity.

* _Spec: The application should stop timer, stop tracking keypresses, Words/Min, Characters/Min and errors when the string in the middle is completed_
  * Input: All characters in the string have been typed
  * Output: Game ends, keypresses are no longer tracked and users stats get displayed.

* _Spec: The application should track the users Time and display it when the game ends_
  * Input: The string in the middle ends because the user typed it correctly or incorrectly
  * Output: Time: how much time you spent typing.

* _Spec: The application should track the users Words/Min and display it when the game ends_
  * Input: The string in the middle ends because the user typed it correctly or incorrectly
  * Output: Words/Min: However many words you typed completely correct.

* _Spec: The application should track the users Characters/Min and display it when the game ends_
  * Input: The string in the middle ends because the user typed it correctly or incorrectly
  * Output: Characters/Min: However many characters you typed completely correct.

* _Spec: The application should track the users Errors and display it when the game ends_
  * Input: The string in the middle ends because the user typed it correctly or incorrectly
  * Output: Errors: However many characters you typed completely incorrect.


## Setup/Installation Requirements
_Clone this repository._
_npm install_
_npm install dotenv-webpack --save-dev_
_npm run start_

## Known Bugs

## Support and contact details
_Issues or concerns? Contact us at andrewphilpott92@gmail.com_

## Technologies Used
_Html_
_CSS_
_JavaScript_
_Babel_
_Dad Jokes API_

### License
<<<<<<< HEAD
Copyright (c) 2020 **_Andrew Philpott, Sasa Schwartz, Jiwon Han, Jack Dunning_**
=======
Copyright (c) 2020 **_Andrew Philpott, Sasa Schwartz, Jiwon Han_**
>>>>>>> cf08a7d22b58c4433543f123e295c1ff171b1ad2

*This software is licensed under the MIT license.*
