var textblock = document.getElementById("text");
var cursor = document.getElementById("cursor");

var texts = [
	"Wake up, Neo...",
	"The Matrix has you...",
	"Follow the white rabbit.",
	"Knock knock, Neo."
]

var textsl = texts.length;
var currenttext = 0;
var currentletter = 0;
var interval;
var string;
var letters;
var lettersl;

setTimeout(function(){
	nextletter();
}, 2000);
cursorblink();

function nextletter(){
	setTimeout(function(){
		insertletter();
	}, interval);
}

function cursorblink(){
	var ci = setInterval(function(){
		changecursor();
	}, 500);
}


function insertletter(){
	if(currenttext < textsl){
		string = texts[currenttext];
		letters = string.split("");
		lettersl = letters.length;

		//last string comes as a whole, not letter by letter
		if(currenttext == textsl-1){
			textblock.innerHTML = "";
			textblock.innerHTML = textblock.innerHTML + texts[textsl-1];
		}else{
			//check if there is still letters in this string
			if(currentletter < lettersl){
				//if this is the first letter, empty the container.
				if(currentletter == 0){
					textblock.innerHTML = "";
				}

				//insert letter
				textblock.innerHTML = textblock.innerHTML + letters[currentletter];
				currentletter++;

				//set next interval
				interval = 110 + Math.floor((Math.random() * 100) + 1);

			//no letters in this string, move to next string
			}else{
				currenttext++;
				currentletter = 0;
				//set longer intervall between strings
				interval = 2000 + Math.floor((Math.random() * 500) + 1);
			}
			nextletter();
		}
	}
}

function changecursor(){
	console.log("asdf");
	if(cursor.innerHTML == "█"){
		cursor.innerHTML = "";
	}else{
		cursor.innerHTML = "█";
	}
}