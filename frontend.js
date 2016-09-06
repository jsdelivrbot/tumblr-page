function generateLine() {
	maintable.innerHTML += "<div><div id='currentline' class='textin'>" + username + "@desktop><span id='edit' contenteditable='true'></span></div></div>";
	currentline = document.getElementById("currentline");
	currenttext = document.getElementById("edit");
	currenttext.onkeydown = function(e) {
		if (ctrlDown && e.keyCode == 67) {
			currenttext.outerHTML = currenttext.innerHTML;
			generateLine();
		}
	}
	currenttext.focus();
}

function print(text) {
	maintable.innerHTML += "<div>" + text + "</div>";
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
	for (var i = 0; i < commands.length; i++) {
		if (commands[i].name == cmdsplit[0]) {
			commands[i].func(cmdsplit.splice(1));
			return
		}
	}
	print("<div>" + cmdsplit[0] + " is not a command</div>");
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
		e.target.outerHTML = e.target.innerHTML;
		var temp = e.target.textContent.trim();
		if (temp != "") processCmds(temp);
		generateLine();
		e.preventDefault(); //No newline at the end
	}
}

//Focus events
window.onkeydown = function(e) {
	currenttext.focus();
	if(e.keyCode == 36) {
		var range = document.createRange();
		range.setStart(currenttext,0);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
}

window.onmouseup = function(e) {
	if (e.target.tagName == "BODY") {
		currenttext.focus();
	}
}

//Init
var maintable;
var currentline;
var currenttext;
var username = (localStorage.username) ? localStorage.username : "user";
var youtubeplayer = null; //Used for the youtube player
window.onload = function() {
	maintable = document.createElement("div");
	document.body.appendChild(maintable);
	print("505e06b2 Firmware [Version: " + SparkMD5.hash((function() {var temp = []; for(var key in commit) temp.push(commit[key]); return temp.join("")})()) + "]");
	print("Copyright (c) 2016 505e06b2.  All rights reserved.");
	print("&nbsp;");
	//PARSE url
	getUrlRegex(unescape(location.search)).forEach(function(e, i) {
		processCmds(e);
	});
	generateLine();
}