function generateLine() {
	maintable.innerHTML += "<tr><td><div id='currentline' class='textin'>" + username + "@desktop><span id='edit' contenteditable='true'></span></div></td></tr>";
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
	maintable.innerHTML += "<tr><td>" + text + "</td></tr>";
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
	
	var split = cmd.split(" ");
	split[0] = split[0].toLowerCase();
	for (var i = 0; i < commands.length; i++) {
		if (commands[i].name == split[0]) {
			commands[i].func(split.splice(1));
			return
		}
	}
	print("<tr><td>" + split[0] + " is not a command</td></tr>");
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

//CTRL EVENTS
var ctrlDown = false;
window.onkeydown = function(e) {
	if (e.keyCode == 17 || e.keyCode == 91) { //CTRL or CMD
		ctrlDown = true;
	} else if (e.keyCode == 38) { //Up Arrow
		currenttext.innerHTML = lastcommand;
	}
}
window.onkeyup = function(e) {
	if (e.keyCode == 17 || e.keyCode == 91) ctrlDown = false;
}

//PRESS ENTER
window.onkeypress = function(e) {
	if ((e.keyCode == 13 || e.key == "Enter" ) && e.target.id == "edit") {
		e.target.outerHTML = e.target.innerHTML;
		lastcommand = e.target.textContent;
		var temp = e.target.textContent.trim();
		if (temp != "") processCmds(temp);
		generateLine();
		e.preventDefault(); //No newline at the end
	}
}

window.onclick = function(e) {
	currenttext.focus();
}

var maintable;
var currentline;
var currenttext;
var lastcommand = "";
var username = (localStorage.username) ? localStorage.username : "user";
window.onload = function() {
	maintable = document.createElement("table");
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