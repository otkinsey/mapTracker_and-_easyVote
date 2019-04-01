window.onload = init;

// the worker
var myWorker;

function init() {
	var startButton = document.getElementById("startButton");
	startButton.onclick = startWorker;
	var sendButton = document.getElementById("sendButton");
	sendButton.onclick = sendMessageToWorker;
	var stopButton = document.getElementById("stopButton");
	stopButton.onclick = stopWorker;
}

// start the Web Worker and register the event handler

function startWorker(e) {
    if(myWorker == null) {
        var content = document.querySelector('#worker1').textContent;
        var bb = new Blob([content]);

        // create a URL string which can be used to reference
        // data stored in a DOM File / Blob object.

        var objUrl = (window.webkitURL || window.URL);
        var blobUrl = objUrl.createObjectURL(bb);
        console.log(blobUrl);
        
        myWorker = new Worker(blobUrl);
        myWorker.addEventListener("message", handleReceipt, false);
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
        myWorker.postMessage(data);
    }    
 }

// terminate the Web Worker
function stopWorker(e) {
    if (myWorker != null) {
        myWorker.terminate();
        myWorker = null;
    }  
}




























