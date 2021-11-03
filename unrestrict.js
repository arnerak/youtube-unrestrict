function getFirstClass(name) {
	return document.getElementsByClassName(name)[0];
}

function bypass()
{
	var errorScreen = document.getElementById("error-screen");
	var hasAgeTag = document.head.querySelector("[property='og:restrictions:age'][content]") != null;
	if (!errorScreen.hidden && hasAgeTag)
	{
		var videoId = (new URL(window.location)).searchParams.get("v");
		
		errorScreen.hidden = true;
		getFirstClass("ytp-error").hidden = true;
		getFirstClass("ytp-chrome-bottom").hidden = true;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://www.youtube.com/youtubei/v1/player", true);
		xhr.setRequestHeader('Host', 'www.youtube.com');
		xhr.setRequestHeader('X-Goog-Api-Key', 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8');
		xhr.send(JSON.stringify({
			"context":{"client":{"clientName":"ANDROID","clientScreen":"EMBED",
			"clientVersion":"16.05"},"thirdParty":{"embedUrl":"https://www.youtube.com"}},
			"videoId":videoId
		}));
		
		xhr.onload = function() {
			var data = JSON.parse(this.responseText);
			var src = data["streamingData"]["formats"].at(data["streamingData"]["formats"].length - 1).url;
			getFirstClass("video-stream").src = src;
			getFirstClass("video-stream").controls = true;
		};
	}
}

setTimeout(bypass, 1000);
