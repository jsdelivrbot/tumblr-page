plugins.youtube = {
					"func": function(e) {
						var line = (function(params) {var temp = []; params.forEach(function(e,i){if (e.length != 0) temp.push(e)});return temp})(e);
						var params = null;
						if (!localStorage.ytvol) localStorage.ytvol = 100;
						var ytcmds = {
							"help": {
								"func": function() {
									print("It is recommended to block ads for Youtube.com for a better listening experience");
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
										var old = document.getElementById("youtube");
										if (old) {
											youtubeplayer.destroy();
											print("Youtube player removed");
										}
										var temp = document.createElement("iframe");
										temp.id = "youtube";
										temp.width = 0;
										temp.height = 0;
										temp.src = "https://www.youtube.com/embed/" + id[1] + "?autoplay=1&enablejsapi=1";
										document.body.insertBefore(temp, maintable);
										youtubeplayer = new YT.Player(temp.id, {
											events: {
												onStateChange: 
													function(e){
														if (e.data === YT.PlayerState.ENDED) {
															youtubeplayer.playVideo(); 
														}
													}
											}
										});
										print("Created Youtube player");
										print("Youtube player volume is " + localStorage.ytvol + "%");										
										temp.onload = function() {
											youtubeplayer.setVolume(localStorage.ytvol);
										}
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
										youtubeplayer.destroy();
										print("Youtube player removed");
									} else {
										print("No player to remove");
									}
								},
								"help": "Remove the Youtube player"
							},
							"reload": {
								"func": function() {
									var temp = document.getElementById("youtube");
									if (temp) {
										var old = temp.src;
										temp.src = location.href;
										temp.src = old;
										print("Youtube player reloaded");
									} else {
										print("No Youtube player to reload");
									}
								},
								"help": "Reload the Youtube player"
							},
							"volume": {
								"func": function() {
									if (params) {
										var temp = parseInt(params, 10);
										if (!temp || temp < 0) {
											temp = 0;
										} else if (temp > 100) {
											temp = 100;
										}
										
										if (youtubeplayer) {
											youtubeplayer.setVolume(temp);
										}
										localStorage.ytvol = temp;
										print("Youtube player volume is now " + temp + "%");
									} else {
										print("Youtube player volume is " + localStorage.ytvol + "%");
									}
								},
								"help": "Set the volume (0 - 100); saves between loads of the console"
							}
						};
						if (!line[0]) {ytcmds.help.func();return}
						line[0] = line[0].toLowerCase();
						if (line[1]) params = line[1];
						if (ytcmds[line[0]]) {
							ytcmds[line[0]].func();
						} else {
							print("Invalid Youtube Command");
						}
					},
					"help": "Youtube controls; use `youtube help` for specific commands"
				}