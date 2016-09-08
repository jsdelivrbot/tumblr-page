function generateLine() {
	if (currenttext) {
		for (var i = 0, temp = document.querySelectorAll('[id="edit"]'); i < temp.length; i++) {
			temp[i].removeAttribute("id");
		}
	}
	maintable.innerHTML += "<div><div class='textin'><span style='background-color:" + allusers[username].bg + ";color:" + allusers[username].colour + "'>" + username + "</span>@desktop><span id='edit' contenteditable='true'></span></div></div>";
	currenttext = document.getElementById("edit");
	currenttext.onpaste = function(e) {
		for (var i = 0, temp = e.clipboardData.types; i < temp.length; i++) {
			if (temp[i] == "text/plain") return;
		}
		e.preventDefault();
	}
	currenttext.focus();
}

function print(text) {
	var node = document.createElement('div');
	node.appendChild(document.createTextNode(text));
	maintable.innerHTML += "<div>" + node.innerHTML + "</div>";
}

function processCmds(cmd) {
	
	//Spooky Secret EasterEggs
	var temp = cmd.toLowerCase();
	if(temp.startsWith("nim")) {
		location.href = "https://www.youtube.com/watch?v=acoZukU67qE";
		return;
	} else if (temp.startsWith("medicine")) {
		location.href = "https://www.youtube.com/watch?v=RSALdVyTrOc";
		return;
	}
	
	var cmdsplit = cmd.split(/\s/g);
	cmdsplit[0] = cmdsplit[0].toLowerCase();
	if (commands[cmdsplit[0]]) {
		return commands[cmdsplit[0]].func(cmdsplit.splice(1));
	}
	print(cmd.split(" ")[0] + " is not a command");
}

function getUrlRegex(text) {
	var regex = /(?:\?|&)(.+?)(?=$|&)/g;
	var res = [];
    var match = null;

    while (match = regex.exec(text)) {
        res.push(match[1]);
    }

    return res;
}

//PRESS ENTER
window.onkeypress = function(e) {
	if ((e.keyCode == 13 || e.key == "Enter" ) && e.target.id == "edit") {
		var temp = e.target.textContent.trim();
		if (temp != "") if (processCmds(temp) !== false) generateLine();
		e.preventDefault(); //No newline at the end
	}
}

//Keydown
var ctrl = false;
window.onkeydown = function(e) {
	if (e.keyCode == 17){
		ctrl = true;
		return;
	} else if (ctrl && e.keyCode == 67) { //CTRL C
		return;
	} else if (e.keyCode == 27) { //Esc
		generateLine();
	}
	currenttext.focus();
	if(e.keyCode == 36) {
		var range = document.createRange();
		range.setStart(currenttext,0);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
}

window.onkeyup = function(e) {
	if (e.keyCode == 17){
		ctrl = false;
		return;
	}
}

//Init
var maintable;
var currenttext;
var username = "user";
var youtubeplayer = null; //Used for the youtube player
var blankline = " "//Alt 255 for blank line
window.onload = function() {
	maintable = document.createElement("div");
	document.body.appendChild(maintable);
	print("505e06b2 Firmware [Version: " + SparkMD5.hash((function() {var temp = []; for(var key in commit) temp.push(commit[key]); return temp.join("")})()) + "]");
	print("Copyright (c) 2016 505e06b2.  All rights reserved.");
	print(blankline);
	//PARSE url
	getUrlRegex(unescape(location.search)).forEach(function(e, i) {
		processCmds(unescape(e).trim());
	});
	generateLine();
	
	window.onmouseup = function(e) {
		if (e.target.tagName == "BODY") {
			currenttext.focus();
		}
	}
}