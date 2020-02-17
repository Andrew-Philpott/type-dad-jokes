import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import $ from "jquery";
import { Player } from "./js/player";
import { Game } from "./js/game";

function callAPI(game) {
  // Call API, format and display response
  fetch(
    `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/30`
  )
    .then(function(response) {
      let json = response.json();
      return json;
    })
    .then(function(json) {
      let paragraph = "";
      for (let i = 0; i < json.length; i++) {
        paragraph += json[i].setup + " " + json[i].punchline + " ";
      }
      return paragraph;
    })
    .then(function(paragraph) {
      let formattedParagraph = formatParagraph(paragraph);
      game.setText(formattedParagraph);
      displayParagraph(formattedParagraph);
    });
}

function formatParagraph(paragraph) {
  let shortWordsArray = paragraph.split(" ");
  if (shortWordsArray.length > 100) {
    shortWordsArray = shortWordsArray.slice(0, 101);
  } else {
    shortWordsArray = shortWordsArray.slice(0);
  }
  let wordsString = shortWordsArray.join(" ");
  return wordsString;
}

function displayParagraph(formattedParagraph) {
  // Display paragraph text to screen
  console.log("display " + formattedParagraph);
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
    $("#player-name").text(name1);
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
    game.setStartTime();
    timer = game.startTimer();
    console.log(game.startTime);
    $("#start-button").hide();
  });

  // ON CLICK OF CHANGE PARAGRAPH BUTTON
  $("#paragraph-button").click(function(event) {
    event.preventDefault();
    callAPI(game);
    clearTimeout(timer);
    $("#start-button").show();
    $("#stats-box").empty();
    console.log("change paragraph button clicked");
  });

  // ON KEY PRESS
  $(document).keypress(function(event) {
    console.log(event.which);

    game.checkCharacter(event.which);
    if (game.isRoundOver()) {
      clearTimeout(timer);
      let player = game.calculateScore();
      $("stats-box").text(`${player.playerName}
      Words per minute: ${player.wordsPerMinute}
      Characters per minute: ${player.charactersPerMinute}
      Errors: ${player.errors}
      Time: ${game.getSeconds}
      `);
      $("#start-button").show();
      $("#paragraph-button").show();
    }
  });
});
