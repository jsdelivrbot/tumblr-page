var commands = [ //Can't be "required" or window.open works funny.. Might sort it later
				{
					"name": "help",
					"func": function() {
						print("For all commands, there is no need for (\") as whitespace is ignored")
						for (var i = 0; i < commands.length; i++) {
							print(commands[i].name + ": " + commands[i].help);
						}
					},
					"help": "Displays all commands and how to use"
				},
				{
					"name": "echo",
					"func": function(out) {
						print(out.join(" "));
					},
					"help": "Print something"
				},
				{
					"name": "clear",
					"func": function() {
						maintable.innerHTML = "";
					},
					"help": "Clear the screen"
				},
				{
					"name": "js",
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
				{
					"name": "load",
					"func": function(s) {
						s = s.join(" ").trim()
						var script = document.createElement("script");
						script.src = s;
						document.head.appendChild(script);
					},
					"help": "Load remote javascript file"
				},
				{
					"name": "su",
					"func": function(e) {
						if (!(e[0] && e[1])) return;
						if (allusers[e[0]] == SparkMD5.hash(e[1])) {
							username = e[0];
							localStorage.username = e[0];
							print("Welcome, " + username);
						} else {
							print("Incorrect Credentials");
						}
					},
					"help": "Log in to an account: su [user] [pass]"
				}
			];