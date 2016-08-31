$( document ).ready(function() {
console.log( "ready!" );

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
	console.log("--------------------------------")
	console.log("Player 1 Wins: " + player1Wins);
	console.log("Player 1 Losses: " + player1Losses);
	console.log("Player 2 Wins: " + player2Wins);
	console.log("Player 2 Losses: " + player2Losses);
	console.log("Ties: " + ties);
	console.log("--------------------------------")

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
		Ties: ties
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



});