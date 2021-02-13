// Create port
var port = chrome.extension.connect({
	name: "C/BG"
});

// Function to black out images
var blackOutImages = function() {
	var images = document.getElementsByTagName('img');
	for(var i = 0, l = images.length; i < l; i++){
		images[i].src = "./img/blackSquare.jpg"
	}
}

// Set up message listener 
port.onMessage.addListener(function(msg){
	console.log("message recieved "+msg);
	if(msg === "changeImages"){
		blackOutImages();
	}
});