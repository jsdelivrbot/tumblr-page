var commands = [
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
				},
				{
					"name": "youtube",
					"func": function(e) {
						var params = null;
						var ytcmds = {
							"help": {
								"func": function() {
									for (var key in ytcmds) {
										print(key + ": " + ytcmds[key].help);
									}
								},
								"help": "Displays help functions"
							},
							"load": {
								"func": function() {
									if (!params) {
										print("No link posted");
										return;
									}
									var id = /(?:&|\?)(?:v=)(.+?)(?:&|$)/.exec(params);
									if (id) {
										var temp = document.createElement("iframe");
										temp.id = "youtube";
										temp.width = 0;
										temp.height = 0;
										temp.src = "https://www.youtube.com/embed/" + id[1] + "?autoplay=1&loop=1&playlist=" + id[1];
										document.body.insertBefore(temp, maintable);
										print("Created Youtube player");
									} else {
										print("Not a Youtube link");
									}
									return;
								},
								"help": "Paste a Youtube URL to play"
							},
							"unload": {
								"func": function() {
									var temp = document.getElementById("youtube");
									if (temp) {
										document.body.removeChild(temp);
										print("Youtube player removed");
									} else {
										print("No player to remove");
									}
								},
								"help": "Remove the Youtube player"
							}
						};
						if (!e[0]) {ytcmds.help.func();return}
						if (e[1]) params = e[1];
						if (ytcmds[e[0]]) {
							ytcmds[e[0].toLowerCase()].func();
						} else {
							print("Invalid Youtube Command");
						}
					},
					"help": "Youtube controls; use `youtube help` for specific commands"
				}
			];