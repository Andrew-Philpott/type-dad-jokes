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
  console.log("format paragraph");
  return paragraph;
}

function displayParagraph(formattedParagraph) {
  // Display paragraph text to screen
  $("#paragraph-box").text(formattedParagraph);
}

$(document).ready(function() {
  const game = new Game();
  callAPI(game);

  // ON SUBMIT OF USER NAME
  $("#name-form").submit(function(event) {
    event.preventDefault();
    const name1 = $("#name-input").val();
    const player1 = new Player(name1);
    game.addPlayer(player1);
    $("player-name").show();
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
    console.log("timer starts...");
    $("#start-button").hide();
    $("#paragraph-button").hide();
  });

  // ON CLICK OF CHANGE PARAGRAPH BUTTON
  $("#paragraph-button").click(function(event) {
    event.preventDefault();
    callAPI(game);
    console.log("change paragraph button clicked");
  });

  // ON KEY PRESS
  $(document).keydown(function(event) {
    console.log("Key " + event.which + "pressed");

    game.checkCharacter();
    console.log("character checked");
    if (game.isRoundOver()) {
      console.log("timer is stopped");
      game.resetSeconds();
      $("#stats-box").show();
      $("#start-button").show();
      $("#paragraph-button").show();
    }
  });
});