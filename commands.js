var commands = {
				"help": {
					"func": function() {
						print("For all commands, there is no need for (\") as whitespace is ignored");
						print("Press Esc to bring up a newline if something breaks or you want to cancel the last operation");
						print("&nbsp;");
						for (var key in commands) {
							print(key + ": " + commands[key].help);
						}
					},
					"help": "Displays all commands and how to use"
				},
				"echo": {
					"func": function(out) {
						print(out.join("&nbsp;"));
					},
					"help": "Print something"
				},
				"clear": {
					"func": function() {
						maintable.innerHTML = "";
					},
					"help": "Clear the screen"
				},
				"js": {
					"func": function(s) {
						s = s.join(" ").trim()
						if (s.length == 0) {print("No text specified as parameter");return}
						try {
							eval(s);
						} catch(e) {
							print(e);
						}
					},
					"help": "Run a JS string"
				},
				"load": {
					"func": function(s) {
						s = s.join(" ").trim()
						var script = document.createElement("script");
						script.src = s;
						print("Loading " + s);
						script.onload = function() {print("Loaded " + s);generateLine()}
						document.head.appendChild(script);
						return false;
					},
					"help": "Load remote javascript file syncronously"
				},
				"colour": {
					"func": function(s) {
						s = s.join(" ").trim()
						maintable.style.color = s;
					},
					"help": "Change the colour of the text in the console"
				},
				"su": {
					"func": function(e) {
						var line = (function(params) {var temp = []; params.forEach(function(e,i){if (e.length != 0) temp.push(e)});return temp})(e);
						if (!(line[0] && line[1])) return;
						if (allusers[line[0]] == SparkMD5.hash(line[1])) {
							username = line[0];
							localStorage.username = line[0];
							print("Welcome, " + username);
						} else {
							print("Incorrect Credentials");
						}
					},
					"help": "Log in to an account: su [user] [pass]"
				}
};