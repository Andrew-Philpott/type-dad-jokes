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
      displayParagraph(game);
    });
}

function formatParagraph(paragraph) {
  // Shorten paragrph to 100 words
  let shortWordsArray = paragraph.split(" ");
  if (shortWordsArray.length > 100) {
    shortWordsArray = shortWordsArray.slice(0, 101);
  } else {
    shortWordsArray = shortWordsArray.slice(0);
  }
  let wordsString = shortWordsArray.join(" ");
  return wordsString;
}

function displayParagraph(game) {
  // Display paragraph text to screen
  let paragraph = game.paragraph;
  let spanParagraph = "";
  for (let i = 0; i < paragraph.length; i++) {
    let spanChar = `<span id=${i} class="neutral">${paragraph[i]}</span>`;
    spanParagraph += spanChar;
  }
  $("#paragraph-box").empty();
  $("#paragraph-box").append(spanParagraph);
}

function updateParagraphColor(game) {
  // Change color of text based on correctness
  let index = game.getCharacterIndex() - 1;
  $(`#${index}`).removeClass();
  $(`#${index + 1}`).addClass("next");
  if (game.inputtedCharacters[index]) {
    $(`#${index}`).addClass("correct");
  } else {
    $(`#${index}`).addClass("error");
  }
}

function displayStats(game) {
  let player = game.calculateScore();
  $("#timer").text(`${game.getSeconds}`);
  $("#wpm").text(`${player.wordsPerMinute}`);
  $("#cpm").text(`${player.charactersPerMinute}`);
  $("#errors").text(`${player.errors}`);
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
    $("#player-name").text(name1);

    $("#name-form").hide();
    $("#page-two").show();
    $("#paragraph-box").show();
  });

  // ON CLICK ON START BUTTON
  $("#start-button").click(function(event) {
    event.preventDefault();
    game.setStartTime();
    game.startTimer();
    $("#start-button").hide();

    // ON KEY PRESS
    $(document).keypress(function(event) {
      game.checkCharacter(event.which);
      updateParagraphColor(game);
      // displayStats(game);
      if (game.isRoundOver()) {
        game.clearTimer();
        $("#start-button").show();
        $("#paragraph-button").show();
      }
    });

    // ON KEY DOWN (backspace recognition)
    $(document).keydown(function(event) {
      if (event.which === 8) {
        game.checkCharacter(event.which);
        updateParagraphColor(game);
        // displayStats(game);
        if (game.isRoundOver()) {
          displayStats(game);
          game.clearTimer();
          $("#start-button").show();
          $("#paragraph-button").show();
        }
      }
    });
  });

  // ON CLICK OF CHANGE PARAGRAPH BUTTON
  $("#paragraph-button").click(function(event) {
    event.preventDefault();
    callAPI(game);
    game.clearTimer();
    $("#start-button").show();
    $(".stats").empty();
  });
});
