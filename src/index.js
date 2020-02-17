import $ from 'jquery';
import 'bootstrap' ;
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Game from './js/game.js'


$(document).ready(function(){
  
  
  
  $("#news").click(function(event) {
    event.preventDefault();
    let news = $("#newsAPI").val();

    (async () => {
    let game = new Game
    const response = await game.getNews(news);
    console.log(response);
    
    }) ();
  

  });
});