$( document ).ready(function() {
console.log( "ready!" );

$('#player1').hide();
$('#player1Buttons').hide();
$('#player2').hide();
$('#player2Buttons').hide();
$('#chat').hide();
$('#chat-text').hide();
$('#chat-text-submit').hide();

var config = {
    apiKey: "AIzaSyDPdw63EUv5qEHARTM2rG0y1pR5TsP8R94",
    authDomain: "rps-multiplayer-a0797.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-a0797.firebaseio.com",
    storageBucket: "rps-multiplayer-a0797.appspot.com",
  };

firebase.initializeApp(config);

database = firebase.database();

//----------------------------------
var player1Wins = 0;
var player2Wins = 0;
//----------------------------------
var player1Losses = 0;
var player2Losses = 0;
//----------------------------------
var ties = 0;
//----------------------------------
var player1Choice = "";
var player2Choice = "";
//----------------------------------
var resetButtons = function() {
	$('#rock1').hide();
	$('#paper1').hide();
	$('#scissors1').hide();
	$('#rock2').hide();
	$('#paper2').hide();
	$('#scissors2').hide();

	$('#rock1').fadeIn(2000);
	$('#paper1').fadeIn(2000);
	$('#scissors1').fadeIn(2000);
	$('#rock2').fadeIn(2000);
	$('#paper2').fadeIn(2000);
	$('#scissors2').fadeIn(2000);

	player1Choice = "";
	player2Choice = "";
}

var status = function() {

	$('#player1Wins').html(player1Wins);
	$('#player1Losses').html(player1Losses);
	$('#player2Wins').html(player2Wins);
	$('#player2Losses').html(player2Losses);
	$('.ties').html(ties);

	database.ref().set({
		Player1Wins: player1Wins,
		Player1Losses: player1Losses,
		Player2Wins: player2Wins,
		Player2Losses: player2Losses,
		Ties: ties,
	})

	return false;
}

var decision = function() {
	if ((player1Choice == 'rock') && (player2Choice == 'scissors')){
			player1Wins = player1Wins + 1;
			player2Losses++;
			status();
			resetButtons();
		}else if ((player1Choice == 'rock') && (player2Choice == 'paper')){
			player1Losses++;
			player2Wins++;
			status();
			resetButtons();
		}else if ((player1Choice == 'scissors') && (player2Choice == 'rock')){
			player1Losses++;
			player2Wins++;
			status();
			resetButtons();
		}else if ((player1Choice == 'scissors') && (player2Choice == 'paper')){
			player1Wins++;
			player2Losses++;
			status();
			resetButtons();
		}else if ((player1Choice == 'paper') && (player2Choice == 'rock')){
			player1Wins++;
			player2Losses++;
			status();
			resetButtons();
		}else if ((player1Choice == 'paper') && (player2Choice == 'scissors')){
			player1Losses++;
			player2Wins++;
			status();
			resetButtons();
		}else if (player1Choice == player2Choice){
			ties++;
			status();
			resetButtons();
		}
}

$('#selectPlayer1').on('click', function() {
	$('#selectPlayer1').remove();
	$('#player1').fadeIn(2000);
	$('#player1Buttons').fadeIn(2000);

})

$('#selectPlayer2').on('click', function() {
	$('#selectPlayer2').remove();
	$('#player2').fadeIn(2000);
	$('#player2Buttons').fadeIn(2000);
	$('#chat').fadeIn(2000);
	$('#chat-text').fadeIn(2000);
	$('#chat-text-submit').fadeIn(2000);
})

/* Player1 and Player2 both submit their choice */
var player1Selection = function () {
	$('#rock1').on('click', function() {
		player1Choice = "rock";
		console.log("Player 1 chose: " + player1Choice);
		player2Selection();
		$('#paper1').hide();
		$('#scissors1').hide();
	})
	$('#paper1').on('click', function() {
		player1Choice = "paper";
		console.log("Player 1 chose: " + player1Choice);
		player2Selection();
		$('#rock1').hide();
		$('#scissors1').hide();
	})
	$('#scissors1').on('click', function() {
		player1Choice = "scissors";
		console.log("Player 1 chose: " + player1Choice);
		player2Selection();
		$('#rock1').hide();
		$('#paper1').hide();
	})
};

player1Selection();

var player2Selection = function () {
	$('#rock2').on('click', function() {
		player2Choice = "rock";
		decision();
	})
	$('#paper2').on('click', function() {
		player2Choice = "paper";
		decision();
	})
	$('#scissors2').on('click', function() {
		player2Choice = "scissors";
		decision();
	})
}

$('#chat-text-submit').on('click', function () {
	text = $('#chat-text-input').val().trim();
	console.log(text);
	newLine = $('<tr><td>' + text + '</td></tr>');
	$('#chat-table').prepend(newLine);
	$('#chat-text-input').val("");
})

$(document).keypress(function(e) {
  if(e.which == 13) {
    text = $('#chat-text-input').val().trim();
	console.log(text);
	newLine = $('<tr><td>' + text + '</td></tr>');
	$('#chat-table').prepend(newLine);
	$('#chat-text-input').val("");
  }
});



});