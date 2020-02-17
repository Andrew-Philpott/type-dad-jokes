import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import $ from "jquery";
import { Player } from "./js/player";
import { Game } from "./js/game";

function callAPI(game) {
  // Call API, format and display response
  console.log("API Called");
  let paragraph = "API paragraph...";
  let formattedParagraph = formatParagraph(paragraph);
  game.setText(formattedParagraph);
  console.log("new text set in game");
  displayParagraph(formattedParagraph);
}

function formatParagraph(paragraph) {
  let wordsArray = paragraph.split(" ");
  let shortWords;
  if (shortWords.length > 100) {
    shortWordsArray = wordsArray.slice(0, 101);
  } else {
    shortWordsArray = wordsArray;
  }
  let wordsString = shortWordsArray.join(" ");
  console.log("format paragraph");
  return wordsString;
}

function displayParagraph(formattedParagraph) {
  // Display paragraph text to screen
  $("#paragraph-box").text(formattedParagraph);
}

$(document).ready(function() {
  const game = new Game();
  let timer;
  callAPI(game);

  // ON SUBMIT OF USER NAME
  $("#name-form").submit(function(event) {
    event.preventDefault();
    const name1 = $("#name-input").val();
    const player1 = new Player(name1);
    game.addPlayer(player1);
    $("player-name").show();
    $("#stats-box").show();
    $("#name-form").hide();
    $("#paragraph-box").show();
    $("start-button").show();
    $("#paragraph-button").show();
    console.log("name submitted");
  });

  // ON CLICK ON START BUTTON
  $("#start-button").click(function(event) {
    event.preventDefault();
    console.log("start button clicked");
    timer = game.startTimer();
    $("#start-button").hide();
  });

  // ON CLICK OF CHANGE PARAGRAPH BUTTON
  $("#paragraph-button").click(function(event) {
    event.preventDefault();
    callAPI(game);
    clearTimeout(timer);
    $("#start-button").show();
    console.log("change paragraph button clicked");
  });

  // ON KEY PRESS
  $(document).keydown(function(event) {
    console.log("Key " + event.which + "pressed");

    game.checkCharacter();
    console.log("character checked");
    if (game.isRoundOver()) {
      clearTimeout(timer);
      game.calculateScore();
      $("#start-button").show();
      $("#paragraph-button").show();
    }
  });
});
