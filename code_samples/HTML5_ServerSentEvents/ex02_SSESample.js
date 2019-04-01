(function () {
	
	// create the EventSource
	var evtSource = new EventSource("ex02_sse.php");

	// Subscribe to Events

	evtSource.onopen = function(e) {
		log("Open... " + e.target.url);
	}

	evtSource.onerror = function(e) {
		log("Error... " + e.target.url);
	}

	evtSource.onmessage = function(e) {
	  log("message: " + e.data);
	  if (e.data  == "Close") {
	  	evtSource.close();
	  }
	}

	function log(message) {
   var newElement = document.createElement("li");
	 newElement.innerHTML = message;
	 items.insertBefore(newElement, items.firstChild);
	}
})();
