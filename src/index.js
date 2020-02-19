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
  game.calculateScore();
  $("#timer").text(`${game.getGameTime()}`);
  $("#wpm").text(`${game.currentPlayer.getWordsPerMinute()}`);
  $("#cpm").text(`${game.currentPlayer.getCharactersPerMinute()}`);
  $("#errors").text(`${game.currentPlayer.getErrors()}`);
}

function updateEveryHalfSecond(game) {
  setInterval(() => {
    displayStats(game);
  }, 500);
}

function createPlayerNameInputs(numberOfPlayers) {
  let numberOfPlayersToNumber = parseInt(numberOfPlayers);
  let nameForm = $("#name-form");
  let nameInputsHtml = `<div id='player-names-container' class='form-group>'`;
  if (numberOfPlayersToNumber === 1) {
    nameInputsHtml += `<div class='name-container'><label for='name-input-1'>Enter your name:</label><input class='player-name-input' type='text' id='name-input-1' required /></div>`;
  } else {
    for (let i = 1; i <= numberOfPlayersToNumber; i++) {
      nameInputsHtml += `<div class='name-container'><label for='name-input-${i}'>Player ${i}'s name</label><input class='player-name-input' type='text' id='name-input-${i}' required /></div>`;
    }
  }
  nameInputsHtml += `<button type='submit' id='name-button'>Submit</button></div>`;
  nameForm.append(nameInputsHtml);
}

$(document).ready(function() {
  const game = new Game();
  callAPI(game);
  $("#page-two").hide();

  // ON NUMBER OF PLAYERS SUBMIT
  $("#players-select").on("click", ".players-button", function() {
    let playerCountInput = $(this).val();
    $("#players-select").hide();
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
    $("player-name").show();
    $("#player-name").text(game.currentPlayer.getName());

    $("#name-form").hide();
    $("#page-two").show();
    $("#paragraph-box").show();
    $("#keyboard").show();
    updateEveryHalfSecond(game);

    console.log('the value is' + $('#keyboard input[value]'))
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

    // ON KEY PRESS
    $(document).keypress(function(event) {
      game.checkCharacter(event.which);
      updateParagraph(game);
      if (game.isRoundOver()) {
        game.clearTimer();
        $("#start-button").show();
        $("#paragraph-button").show();
      }
    });



    // ON KEY DOWN (backspace recognition)
    $(document).keydown(function(event) {
      if (event.which === 8) {
        let prevIndex = game.getCharacterIndex();
        game.checkCharacter(event.which);
        backSpace(game, prevIndex);
        displayStats(game);
        if (game.isRoundOver()) {
          game.clearTimer();
          $("#start-button").show();
          $("#paragraph-button").show();
        }
      }
      var keycode = (event.keyCode ? event.keyCode : event.which);
      console.log('keycode is' + keycode)
      let letter = String.fromCharCode(keycode)
      console.log('letter converted from keycode is ' + letter)
      const values = $('#keyboard input[value]')
      console.log('value is' + values)
      for (var i =0; i < values.length; i ++) {
      if( letter === values[i].value) {

        console.log(values[i])
        $(values).removeClass('buttonPressEffect');
        $(values[i]).addClass('buttonPressEffect');

      }

    }
    });

    $(document).keyup(function(event) {
      event.preventDefault();
      const values = $('#keyboard input[value]')
      $(values).removeClass('buttonPressEffect');
    })
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
