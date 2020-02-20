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

// function recordErrorsOnKeyboard() {

// }

function formatParagraph(paragraph) {
  // Shorten paragrph to 100 words
  let shortWordsArray = paragraph.split(" ");
  if (shortWordsArray.length > 100) {
    // shortWordsArray = shortWordsArray.slice(0, 101);
    shortWordsArray = shortWordsArray.slice(0, 10);
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
  $("#paragraph-box").append(
    `<div id="paragraph-padding"><div id="paragraph">${spanParagraph}</div></div>`
  );
}

function updateParagraph(game) {
  // Change color of text based on correctness and shift left
  let index = game.getCharacterIndex() - 1;

  if (game.getCharacterIndex() < game.paragraph.length) {
    let position = $("#paragraph").offset().left;
    let letterWidth = $(`#${index}`).width();
    let newPosition = position - letterWidth;
    $("#paragraph").offset({ left: newPosition });
  }
  $(`#${index}`).removeClass();
  $(`#${index + 1}`).addClass("next");
  if (game.inputtedCharacters[index]) {
    $(`#${index}`).addClass("correct");
  } else {
    $(`#${index}`).addClass("error");
  }
}

function backSpace(game, prevIndex) {
  let index = game.getCharacterIndex();

  if (index + 1 < game.getCharacters().length && index !== prevIndex) {
    let position = $("#paragraph").offset().left;
    let letterWidth = $(`#${index}`).width();
    let newPosition = position + letterWidth;
    $("#paragraph").offset({ left: newPosition });

    $(`#${index + 1}`).removeClass();
    $(`#${index + 1}`).addClass("neutral");
    $(`#${index}`).removeClass();
    $(`#${index}`).addClass("next");
  }
}

function displayStats(game) {
  if (!game.isRoundOver()) {
    game.calculateScore();
  }
  $("#player-name").text(game.currentPlayer.getName());
  $("#timer").text(`${game.getGameTime()}`);
  $("#wpm").text(`${game.currentPlayer.getWordsPerMinute()}`);
  $("#cpm").text(`${game.currentPlayer.getCharactersPerMinute()}`);
  $("#errors").text(`${game.currentPlayer.getErrors()}`);
}

function updateEveryQuarterSecond(game) {
  setInterval(() => {
    displayStats(game);
  }, 250);
}

function createPlayerNameInputs(numberOfPlayers) {
  let numberOfPlayersToNumber = parseInt(numberOfPlayers);
  let nameForm = $("#name-form");
  let nameInputsHtml = ``;
  nameInputsHtml += `<div id='player-names-container' class='form-group'><h1>Enter your names</h1>`;
  if (numberOfPlayersToNumber === 1) {
    nameInputsHtml += `<div class='name-container rounded-white'><label for='name-input-1'>Enter your name:</label><input class='player-name-input' type='text' id='name-input-1' required /></div>`;
  } else {
    for (let i = 1; i <= numberOfPlayersToNumber; i++) {
      nameInputsHtml += `<div class='name-container rounded-white'><label for='name-input-${i}'>Player ${i}</label><input class='player-name-input' type='text' id='name-input-${i}' required /></div>`;
    }
  }
  nameInputsHtml += `<button id='name-button' class='rounded-white' type='submit'>Submit</button></div>`;
  
  nameForm.html(nameInputsHtml);
}

function endRound(game) {
  removeKeyboardListeners();
  game.clearTimer();
  if (!game.isTwoPlayer()) {
    $("#start-button").show();
  } else if (game.getRoundCount() === 0) {
    $("#start-button").show();
    $("#paragraph-button").show();
  } else if (game.isTwoPlayer() && game.getRoundCount() === 1) {
    $("#start-button").show();
    $("#start-button").text("Next Player");
  } else if (game.isTwoPlayer() && game.getRoundCount() === 2) {
    $("#start-button").text("Start Race");
    $("#game-page").hide();
    $("#results-page").show();
    displayResults(game);
  }
}

function displayResults(game) {
  for (let i = 0; i < game.players.length; i++) {
    $(`#player${i}-results`).append(
      `<p><span>Player:</span> ${game.players[i].getName()}</p>`
    );
    $(`#player${i}-results`).append(
      `<p><span>Words per Minute:</span> ${game.players[
        i
      ].getWordsPerMinute()}</p>`
    );
    $(`#player${i}-results`).append(
      `<p><span>Characters per Minute:</span> ${game.players[
        i
      ].getCharactersPerMinute()}</p>`
    );
    $(`#player${i}-results`).append(
      `<p><span>Errors: </span>${game.players[i].getErrors()}</p>`
    );
  }
}

function keyPressEventListener(game, event) {
  let keycode = event.which;
  game.checkCharacter(keycode);
  updateParagraph(game);
}

function keyDownEventListener(game, event) {
  let keycode = event.which;
  if (keycode === 8 && !game.isRoundOver()) {
    let prevIndex = game.getCharacterIndex();
    game.checkCharacter(keycode);
    backSpace(game, prevIndex);
  }
  let letter = String.fromCharCode(keycode);
  const values = $("#keyboard input[value]");
  for (let i = 0; i < values.length; i++) {
    if (letter === values[i].value) {
      $(values).removeClass("buttonPressEffect");
      $(values[i]).addClass("buttonPressEffect");
    }
  }
}

function keyUpEventListener(event) {
  event.preventDefault();
  const values = $("#keyboard input[value]");
  $(values).removeClass("buttonPressEffect");
}

function removeKeyboardListeners() {
  $(document).off("keypress");
  $(document).off("keydown");
}

$(document).ready(function() {
  const game = new Game();
  callAPI(game);
  $("#game-page").hide();
  $("#results-page").hide();

  // ON NUMBER OF PLAYERS SUBMIT
  $("#players-select").on("click", ".players-button", function() {
    let playerCountInput = $(this).val();
    $("#players-select").hide();
    $("#header").hide();
    createPlayerNameInputs(playerCountInput);
  });

  // ON SUBMIT OF USER NAME
  $("#name-form").submit(function(event) {
    event.preventDefault();
    let nameInputs = [];
    nameInputs = $(".player-name-input");
    for (let i = 0; i < nameInputs.length; i++) {
      let name = $(nameInputs[i]).val();
      let player = new Player(name);
      game.addPlayer(player);
    }
    $("#name-form").hide();
    $("#game-page").show();
    updateEveryQuarterSecond(game);
  });

  // ON CLICK ON START BUTTON
  $("#start-button").click(function(event) {
    event.preventDefault();
    $("#traffic-light-bg").fadeIn();
    setTimeout(() => {
      $("#traffic-light-bg").hide();
      game.setStartTime();
      game.startTimer();
      game.setText(game.paragraph);
      displayParagraph(game);
    }, 3000);
    $("#start-button").hide();
    if (game.isTwoPlayer()) {
      $("#paragraph-button").hide();
    }

    // ON KEY PRESS (giving values of keys to backend)
    $(document).keypress(function(event) {
      event.preventDefault();
      keyPressEventListener(game, event);
      if (game.isRoundOver()) {
        game.changePlayer();
        endRound(game);
      }
    });

    // ON KEY DOWN (backspace and visual keyboard)
    $(document).keydown(function(event) {
      keyDownEventListener(game, event);
      if (game.isRoundOver()) {
        game.changePlayer();
        endRound(game);
      }
    });

    // ON KEY UP (visual keyboard release)
    $(document).keyup(function(event) {
      keyUpEventListener(event);
    });
  });

  // ON CLICK OF CHANGE PARAGRAPH BUTTON
  $("#paragraph-button").click(function(event) {
    event.preventDefault();
    callAPI(game);
    endRound(game);
    $(".stats").empty();
  });

  // ON CLICK OF NEW GAME BUTTON
  $("#new-game").click(function(event) {
    event.preventDefault();
    $("#game-page").show();
    $(".results-section").empty();
    $("#results-page").hide();
    game.resetRoundCount();
    callAPI(game);
    endRound(game);
  });
});
