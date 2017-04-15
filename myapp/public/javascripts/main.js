function main(){
	var button = document.querySelector('.playBtn');
	button.addEventListener('click',function(e){
		e.preventDefault();
		document.querySelector('.start').style.display = 'none';
		var x = document.getElementById("startValues").value;
		initialVal = x.split(',');
		player = [];
		computer = [];
		var winnerPrintOut = document.createElement('P');
		winnerPrintOut.id = 'winnerPrint';
		winnerPrintOut.style.display = 'none';
		document.querySelector('.game').appendChild(winnerPrintOut);
		var compImgClass = document.createElement('div');
		compImgClass.className = 'computerIClass';

		compContain = document.createElement('div');
		compContain.id = 'cHand';
		playContain = document.createElement('div');
		playContain.id = 'pHand';
		document.querySelector('.game').appendChild(compContain);
		document.querySelector('.game').appendChild(playContain);
		cards = generateCards();
		playerTotal = calculateHand(player);
		computerTotal = calculateHand(computer);
		shuffledDeck = shuffle(cards);

		compContain.appendChild(computer[0].img);
		playContain.appendChild(player[0].img);

		compContain.appendChild(computer[1].img);
		playContain.appendChild(player[1].img);

		var playerPrintOut = document.createElement('P');
		playerPrintOut.id = 'playerPrint';
		playerPrintOut.style.display = '';

		var computerPrintOut = document.createElement('P');
		computerPrintOut.id = 'computerPrint';
		computerPrintOut.style.display = '';
		document.querySelector('.game').appendChild(playerPrintOut);
		document.querySelector('.game').appendChild(computerPrintOut);

		var hitButton = document.createElement('input');
		hitButton.type = 'button';
		hitButton.id = 'btn_hit';
		hitButton.value = 'Hit';
		hitButton.style.display = '';
		hitButton.addEventListener('click', function(e){
			playerMove('h');});
		document.querySelector('.game').appendChild(hitButton);

		var standButton = document.createElement('input');
		standButton.type = 'button';
		standButton.id = 'btn_stand';
		standButton.value = 'Stand';
		standButton.style.display = '';
		standButton.addEventListener('click', function(e){
			playerMove('s');});
		document.querySelector('.game').appendChild(standButton);
		document.getElementById("playerPrint").innerHTML = "Your total is: " + playerTotal;
		document.getElementById("computerPrint").innerHTML = "Computer total is: ?";
		document.getElementById("playerPrint").style.display = '';
		document.getElementById("computerPrint").style.display = '';

		var resetButton = document.createElement('input');
		resetButton.type = 'reset';
		resetButton.id = 'btn_reset';
		resetButton.value = 'Reset';
		resetButton.style.display = 'none';
		resetButton.addEventListener('click', function(e){
				resetGame();
			});
		document.querySelector('.game').appendChild(resetButton);
		//document.querySelector('.game').appendChild(obj);
	});
};
document.addEventListener('DOMContentLoaded', main);


function createImg(src){
	var computerImg = document.createElement('IMG');
	computerImg.src =  src;
	return computerImg;
}
// FIND A CARD IN THE DECK
function findCard(card,deck){
	for(var i = 0; i < deck.length; i++){
		if(deck[i].face == card.face && deck[i].suit == card.suit){
			return i;
		}
	}
	return -1;
}

// RESET THE GAME
function resetGame(){
	initialVal = [];
	for(var i = 0; i < player.length; i++){
		player[i].img.remove();
	}
	for(var i = 0; i < computer.length; i++){
		computer[i].img.remove();
	}
	player = [];
	computer = [];
	document.getElementById('btn_reset').style.display = 'none';
	document.getElementById('winnerPrint').style.display = 'none';
	document.getElementById('btn_hit').style.display = '';
	document.getElementById('btn_stand').style.display = '';
	cards = generateCards();
	playContain.appendChild(player[0].img);
	playContain.appendChild(player[1].img);
	compContain.appendChild(computer[0].img);
	compContain.appendChild(computer[1].img);
	playerTotal = calculateHand(player);
	//shuffledDeck = shuffle(cards);
	document.getElementById('playerPrint').innerHTML = "Your total is: " + playerTotal;
	document.getElementById('computerPrint').innerHTML = "Computer total is: ?";
	document.getElementById('playerPrint').style.display = '';
	document.getElementById('computerPrint').style.display = '';
}

// GENERATE THE DECK
function generateCards() {
	var suit = ['spades', 'hearts', 'diamonds', 'clubs'];
	var face = ['2', '3', '4', '5', '6', '7',
			'8', '9', '10', 'J', 'Q', 'K', 'A'];
	for(var i = 0; i<initialVal.length; i++){
		do{
			var random = Math.floor((Math.random() * 4));
			var thisSuit = suit[random];
			var thisFace = initialVal[i];
			var thisCard = {suit: thisSuit, face: thisFace};
		}while(findCard(thisCard,computer) != -1 || findCard(thisCard,player) != -1);

		if(i % 2){
			thisCard.img = createImg(getImg(thisCard));
			thisCard.img.id = 'p_' + i>>1;
			player.push(thisCard);
		}
		else{
			thisCard.img = createImg(getImg(thisCard));
			if(i == 0){
				thisCard.img.src = 'images/backOfCard.png';
			}
			thisCard.img.id = 'c_' + i>>1;
			computer.push(thisCard);
		}
	}
	deck= [];
	for (var i = 0; i < face.length; i++) {
		for (var j = 0; j < suit.length; j++ ) {
			var card = {
				face: face[i],
				suit: suit[j]
			}
			if(findCard(card,computer) != -1 || findCard(card,player) != -1){
				continue;
			}
			card.img = createImg(getImg(card));
			deck.push(card);
		}
	}
	if(initialVal.length == 0){
		shuffledDeck = shuffle(deck);
		deck = shuffledDeck;
		for(var i = 0; i < 2; i++){
			computer.push(deck[0]);
			computer[i].img = createImg(getImg(computer[i]));
			if(i == 0){
				computer[i].img.src = 'images/backOfCard.png';
			}
			computer[i].img.id = 'c_' + i;
			deck.splice(0,1);
			player.push(deck[0]);
			player[i].img = createImg(getImg(player[i]));
			player[i].img.id = 'p_' + i;

			deck.splice(0,1);
		}
	}
	return deck;
}

// FUNCTION TO GET IMG FOR CARD
function getImg(card){
	var img = '';
	if(card.face == '2'){
		if(card.suit == 'spades'){
			img = "2_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "2_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "2_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "2_of_diamonds.svg";
		}
	}
	if(card.face == '3'){
		if(card.suit == 'spades'){
			img = "3_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "3_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "3_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "3_of_diamonds.svg";
		}
	}
	if(card.face == '4'){
		if(card.suit == 'spades'){
			img = "4_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "4_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "4_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "4_of_diamonds.svg";
		}
	}
	if(card.face == '5'){
		if(card.suit == 'spades'){
			img = "5_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "5_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "5_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "5_of_diamonds.svg";
		}
	}
	if(card.face == '6'){
		if(card.suit == 'spades'){
			img = "6_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "6_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "6_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "6_of_diamonds.svg";
		}
	}
	if(card.face == '7'){
		if(card.suit == 'spades'){
			img = "7_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "7_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "7_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "7_of_diamonds.svg";
		}
	}
	if(card.face == '8'){
		if(card.suit == 'spades'){
			img = "8_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "8_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "8_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "8_of_diamonds.svg";
		}
	}
	if(card.face == '9'){
		if(card.suit == 'spades'){
			img = "9_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "9_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "9_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "9_of_diamonds.svg";
		}
	}
	if(card.face == '10'){
		if(card.suit == 'spades'){
			img = "10_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "10_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "10_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "10_of_diamonds.svg";
		}
	}
	if(card.face == 'J'){
		if(card.suit == 'spades'){
			img = "jack_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "jack_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "jack_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "jack_of_diamonds.svg";
		}
	}
	if(card.face == 'Q'){
		if(card.suit == 'spades'){
			img = "queen_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "queen_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "queen_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "queen_of_diamonds.svg";
		}
	}
	if(card.face == 'K'){
		if(card.suit == 'spades'){
			img = "king_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "king_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "king_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "king_of_diamonds.svg";
		}
	}
	if(card.face == 'A'){
		if(card.suit == 'spades'){
			img = "ace_of_spades.svg";
		}
		if(card.suit == 'hearts'){
			img = "ace_of_hearts.svg";
		}
		if(card.suit == 'clubs'){
			img = "ace_of_clubs.svg";
		}
		if(card.suit == 'diamonds'){
			img = "ace_of_diamonds.svg";
		}
	}

	//card.img = createImg(img);
	return 'images/' + img;
}

// SHUFFLE DECK
function shuffle(deck) {
	var shuffledDeck = new Array();
	var index;
	for (var i = 0; i < deck.length; i++) {
		index = Math.floor(Math.random() * deck.length);
		shuffledDeck.push(deck[index]);
		deck.splice(index, 1);
	}
	return shuffledDeck;
}

// CALCULATE HAND TOTAL
function calculateHand(cards) {
	var total = 0;
	var length = cards.length;
	var aceCount = 0;
	for (var i = 0; i < length; i++){
		if (cards[i].face == 'J' || cards[i].face == 'Q' ||
			cards[i].face == 'K') {
				total = total + 10;
		}
		else if (cards[i].face == 'A') {
			total = total + 11;
			aceCount++;
		}
		else {
			total = total + parseInt(cards[i].face);
		}
	}
	while (total > 21 && aceCount > 0) {
		total = total - 10;
		aceCount--;
	}
	return total;
}

// DETERMINE THE WINNER
function determineWinner(human, computer) {
	var winner = '';
	if (human > 21 || computer > 21) {
		if (human > 21 && computer > 21) {
			console.log(human);
			console.log(computer);
			winner = "YOU BOTH BUST!";
			return winner;
		}
		if (human <= 21) {
			winner = "Computer Busts, You win!";
			return winner;
		}
		else {
			winner = "You Bust, Computer wins!";
			return winner;
		}
	}
	if (human==computer){
		winner = "It's a tie!!!";
		return winner;
	}
	else {
		var humanDif = 21-human;
		var compDif = 21-computer;
		if (humanDif>compDif) {
			winner = 'Computer wins!';
			return winner;
		}
		else {
			winner = "You win!";
			return winner;
		}
	}
}

// PLAYER MOVE
function playerMove(move){
	switch (move) {
		case 'h':
			// Deal one card, calculate value, remove from deck
				player.push(shuffledDeck[0]);
				playContain.appendChild(player[player.length-1].img);
				playerTotal = calculateHand(player);
				shuffledDeck.splice(0, 1);
				document.getElementById('playerPrint').innerHTML = "Your total is: " + playerTotal;
				if(playerTotal > 21){
					document.getElementById('winnerPrint').innerHTML = determineWinner(playerTotal,computerTotal);
					document.getElementById('winnerPrint').style.display = '';
					document.getElementById('btn_hit').style.display = 'none';
					document.getElementById('btn_stand').style.display = 'none';
					document.getElementById('btn_reset').style.display = '';
					return;
				}
			break;
		// If "stay", break from loop
		case 's':
			stay = true;
			// begin computer turn
			setTimeout(startAI,1000);
			document.getElementById('btn_hit').style.display = 'none';
			document.getElementById('btn_stand').style.display = 'none';
			document.getElementById('btn_reset').style.display = '';
			break;
		default:
			alert('Unknown Value ' + move);
			break;

	}
}

// COMPUTER MOVE
function startAI(){
	stay = false;
	if(computer[0].img.src.indexOf('images/backOfCard.png') != -1) {
		computer[0].img.src = getImg(computer[0]);
	}
	//while (!stay) {
		computerTotal = calculateHand(computer);
		document.getElementById("computerPrint").innerHTML = "Computer total is: " + computerTotal;
		if (computerTotal >= 17 && computerTotal <= 21) {
			stay = true;
			document.getElementById('winnerPrint').innerHTML = determineWinner(playerTotal,computerTotal);
			document.getElementById('winnerPrint').style.display = '';
			return;
		}
		if(computerTotal > 21){
			document.getElementById('winnerPrint').innerHTML = determineWinner(playerTotal,computerTotal);
			document.getElementById('winnerPrint').style.display = '';
			return;
		}
		computer.push(shuffledDeck[0]);
		compContain.appendChild(computer[computer.length-1].img);
		shuffledDeck.splice(0, 1);
		setTimeout(startAI,1000);
	//}
}
