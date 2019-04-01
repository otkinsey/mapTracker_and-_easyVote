window.onload = init;

// the worker
var myWorker;

function init() {
	var startButton = document.getElementById("startButton");
	startButton.onclick = startWorker;
	var sendButton = document.getElementById("sendButton");
	sendButton.onclick = sendMessageToWorker;
}

// start the Shared Web Worker and register the event handler
function startWorker(e) {
    if (myWorker == null) {
        myWorker = new SharedWorker("sharedBroadcastWorker.js");
        myWorker.onerror = function(e){
            throw new Error(e.message + " (" + e.filename + ":" + e.lineno + ")" );
        };

        myWorker.port.addEventListener("message", 
                    handleReceipt, false);
        myWorker.port.start();
    }	
}

// Handle messages received from the Web Worker
function handleReceipt(event) {
    var itemsList = document.getElementById("items");
    var item = document.createElement("li");
    item.innerHTML = event.data;
    items.appendChild(item);
}

// send message to the Web Worker
function sendMessageToWorker(e) {
	var data = document.getElementById("msg").value;
    if (myWorker != null) {
        myWorker.port.postMessage(data);
    }    
 }



























