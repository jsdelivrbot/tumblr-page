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
for(var key in commit) {
	appendScript(getLink(commit[key], key + ".js"));
}