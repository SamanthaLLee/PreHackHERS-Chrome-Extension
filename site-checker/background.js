var lastWebsite = "";
var timestamps = [];

// Check the website visited
var checkWebsite = function(tabId, changeInfo, tab){
	
	// Initialize options for notification
	var opt = {
		iconUrl: './img/icon.png',
		type: 'basic',
		priority: 1,
		title: "Hey, you!",
		message: "You should be studying!"
	}
	
	// Check for substrings
	if(changeInfo.url){
		if(changeInfo.url.includes("youtube")){
			console.log("youtube");
			lastWebsite = "youtube";
			
			chrome.notifications.create('',opt,function(){});
			
			chrome.storage.sync.get('timestamps', function(result){
				var temp = result.timestamps;
				temp.push(new Date().toLocaleString());
				chrome.storage.sync.set({'timestamps':temp}, function(){
					console.log("timestamps set");
				});
			});
		}
		
		// Send messages to other scripts
		chrome.tabs.query({active:true}, function(tabs){
			chrome.extension.onConnect.addListener(function(port){
				port.postMessage("changeImages");
			});
			chrome.extension.onConnect.addListener(function(port){
				port.postMessage("updateTimes");
			});
		});
	}else{
		lastWebsite = "";
	}
}

// Listen for tab changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	// console.log(tab);
	// console.log(changeInfo);
	checkWebsite(tabId, changeInfo, tab);
});

// Set up object in storage
chrome.storage.sync.set({'timestamps':timestamps}, function(){
	console.log("timestamps set");
});

