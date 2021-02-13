// Create port
var port = chrome.extension.connect({
	name: "P/BG"
});

// Function to update timestamps
var updateTimestamps = function() {
	chrome.storage.sync.get('timestamps', function(result){
		var temp = result.timestamps;
		document.getElementById("ts").innerHTML = "";
		for(i = 0; i < temp.length; i++){
			document.getElementById("ts").innerHTML += "<p>"+temp[i]+"</p>";
		}
	});
}

// Set up message listener 
port.onMessage.addListener(function(msg){
	//console.log("message recieved "+msg);
	if(msg === "updateTimes"){
		updateTimestamps();
	}
});