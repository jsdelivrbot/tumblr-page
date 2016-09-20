var url = "https://cdn.rawgit.com/505e06b2/tumblr-page/";
function getLink(commit, file) {
	return url + commit + "/" + file;
}
		
function appendScript(src) {
	var temp = document.createElement("script");
	temp.src = src;
	document.head.appendChild(temp);
}
		
document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="' + url + commit.global + '/global.css">';
appendScript(getLink(commit.frontend, "frontend.js"));
appendScript(getLink(commit.commands, "commands.js"));
appendScript(getLink(commit.users, "users.js"));
appendScript(getLink(commit.youtube, "youtube.js"));