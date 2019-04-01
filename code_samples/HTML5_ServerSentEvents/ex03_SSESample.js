(function () {
	
	// create the EventSource
	var evtSource = new EventSource("ex03_sse.php");

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

	evtSource.addEventListener("odd", function(e) {
	  var obj = JSON.parse(e.data);
	  console.log(obj);
	  log("odd event at " + obj.time + ", number: " + obj.number);
	}, false);

	function log(message) {
   var newElement = document.createElement("li");
	 newElement.innerHTML = message;
	 items.insertBefore(newElement, items.firstChild);
	}
})();
