var numCards = 12;
var cards = {};
var pairs = {};
var selected = -1;
var pairsFound = 0;
var moves = 0;
var status;
var i= null;

function setup(){/*
	createMenu();
	createStatus();
*/console.log("D5AL");

document.addEventListener('keydown', function(e) {
	switch(e.keyCode){
	case 37 : //LEFT arrow 	
		navigation("LEFT");
		break;
	case TvKeyCode.KEY_UP: //UP arrow
		navigation("UP");
		break;
	case 39 : //RIGHT arrow 		
		navigation("RIGHT");
        break;
	case TvKeyCode.KEY_DOWN: //DOWN arrow

		navigation("DOWN")
		break;
	case 13: //OK button
		go_to(current_item);
		console.log("ENTER Button");
		break;
	 case 10009: //Back button
         parent.location = "../../index.html";
         console.log("Back Button");
         break;
	default:
		console.log("Key code : " + e.keyCode);
		break;   		
	}
});
	createGameboard();
	assignCardPairs();
	navigation("RIGHT");
	
}

function createMenu(){
	menuDiv = document.getElementById("menu");
	dMenu = createDifficultyMenu();
	menuDiv.appendChild(dMenu);
	
	resetMenu = document.createElement("div");
	resetMenu.id = "resetmenu";
	resetMenu.setAttribute("class", "menu");
	resetMenu.innerHTML = "reset";
	resetMenu.addEventListener("click", reset, false);
	menuDiv.appendChild(resetMenu);
}

function createDifficultyMenu(){
	dMenu = document.createElement("div");
	dMenu.id = "dmenu";
	dMenu.setAttribute("class", "menu");
	easy = document.createElement("div");
	easy.id = "easy";
	dMenu.appendChild(easy);
	medium = document.createElement("div");
	medium.id = "medium";
	dMenu.appendChild(medium);
	hard = document.createElement("div");
	hard.id = "hard";
	dMenu.appendChild(hard);
	return dMenu;
}

function createStatus(){
	statusDiv = document.getElementById("status");
	movesLabel = document.createElement("div");
	movesLabel.id = "moveslabel";
	movesLabel.innerHTML = "Moves:";
	statusDiv.appendChild(movesLabel);
	
	movesValue = document.createElement("div");
	movesValue.id = "movesvalue";
	movesValue.innerHTML = "0";
	statusDiv.appendChild(movesValue);
	
	status = movesValue;
}

function createGameboard(){
	gameboardDiv = document.getElementById("gameboard");
	
	for(var i = 0; i < numCards; i++){
		card = document.createElement("div");
		card.id = "card" + i;
		card.setAttribute("class", "card");
		gameboardDiv.appendChild(card);
		//card.addEventListener("click", flipCard, false);
		
		cardback = document.createElement("div");
		cardback.setAttribute("class", "card-back");
		card.appendChild(cardback);
		
		cardfront = document.createElement("div");
		cardfront.setAttribute("class", "card-front");
		card.appendChild(cardfront);
		
		cards[i] = card;
	}
}

function flipCard(card){
	//card = this;
	card.setAttribute("class", "card active pair" + pairs[card.id]);
	card.firstChild.setAttribute("class", "card-back-active");
	card.lastChild.setAttribute("class", "card-front-active");
	if(selected == -1){
		selected = card;
	}
	else if (selected == card){
		// Selected the same card. Do nothing.
		return;
	}
	else{
		if(pairs[card.id] == pairs[selected.id]){
			// match made
			//selected.removeEventListener("click", flipCard, false);
			//card.removeEventListener("click", flipCard, false);
			selected = -1;
			pairsFound++;
			
		}
		else{
			card1 = card;
			card2 = selected;
			selected = -1;
			setTimeout(function() {
				card1.setAttribute("class", "card pair" + pairs[card1.id]);
				card1.firstChild.setAttribute("class", "card-back");
				card1.lastChild.setAttribute("class", "card-front");
				card2.setAttribute("class", "card pair" + pairs[card2.id]);
				card2.firstChild.setAttribute("class", "card-back");
				card2.lastChild.setAttribute("class", "card-front");
			},1000);
			
		}
		moves++;
		status.innerHTML = moves;
		if(pairsFound == (numCards/2)){
			alert("You Won in " + moves + " moves!");
		}
	}
}

function assignCardPairs(){
	var numPairs = numCards / 2;
	var taken = new Array();
	for(var i = 0; i < numPairs; i++){
		var card1, card2;
		do{
			card1=Math.floor(Math.random()*numCards);
		}while(taken[card1] == true);
		taken[card1] = true;
		do{
			card2=Math.floor(Math.random()*numCards);
		}while(taken[card2] == true);
		taken[card2] = true;
		pairs["card"+card1] = i;
		pairs["card"+card2] = i;
	}
}

function reset(){
	pairs = {};
	selected = -1;
	pairsFound = 0;
	moves = 0;
	status.innerHTML = moves;
	resetGameboard();
	assignCardPairs();
}

function resetGameboard(){
	resetCard(0, pairs);
}

function resetCard(id, pairs){
	if((act = cards[id].getAttribute("class").indexOf("active")) > 0){
		//cards[id].setAttribute("class", "card pair" + pairs[cards[id].id]);
		cards[id].setAttribute("class", cards[id].getAttribute("class").substr(0, act) + cards[id].getAttribute("class").substr(act + 7, cards[id].getAttribute("class").length));
		cards[id].firstChild.setAttribute("class", "card-back");
		cards[id].lastChild.setAttribute("class", "card-front");
		setTimeout(function(){
			resetCard(id, pairs);
		}, 200);
	}
	else{
	cards[id].setAttribute("class", "card-reset");
	cards[id].addEventListener("click", flipCard, false);
	var card = cards[id];
	setTimeout(function() {
		card.setAttribute("class", "card");
		},2000);	
	if((id+1) < numCards){
		setTimeout(function(){
			resetCard(id+1, pairs);
		}, 200);
	}
	}
}
current_item=-1;
total_item=11;

	function navigation(direction){
		

		$("#card"+current_item).removeClass("selected_btn");
		if(direction == "LEFT"){
			if(current_item == 0)
				current_item = total_item;
			else
				current_item--;
		
		}else if(direction == "RIGHT"){
			if(current_item == total_item)
				current_item = 0;
			else
				current_item++;
		}else if(direction == "UP"){
			if(current_item < 4)
				current_item = current_item+8 ;
			else
				current_item = current_item - 3;
		}else if(direction == "DOWN"){
			if(current_item > 9)
				current_item = (current_item+ 3 ) - 12;
			
			else
				current_item = current_item + 3;
		}
		console.log(current_item);
		$("#card"+current_item).addClass("selected_btn");
		//document.getElementById("card" + current_item).setAttribute("class", "card-back-active");
		
		
	};
	function go_to(current_item){
		console.log(current_item);
		flipCard(document.getElementById("card" + current_item));
		//onPeekComplete("card-back"+current_item);
	};
	

