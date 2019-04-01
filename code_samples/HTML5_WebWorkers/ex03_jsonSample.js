window.onload = init;

function init() {
	var echoButton = document.getElementById("echoButton");
	echoButton.onclick = sendEchoToWorker;
	var revButton = document.getElementById("revButton");
	revButton.onclick = sendReverseToWorker;
	var stopButton = document.getElementById("stopButton");
	stopButton.onclick = sendStopToWorker;
}

// the worker
var myWorker = new Worker("jsonWorker.js");
myWorker.onmessage = handleReceipt;

// Handle messages received from the Web Worker
function handleReceipt(event) {
    var itemsList = document.getElementById("items");
    var item = document.createElement("li");
    item.innerHTML = event.data;
    items.appendChild(item);
}

// send messages to the Web Worker
function sendEchoToWorker(e) {
	var data = document.getElementById("msg").value;
    myWorker.postMessage({'cmd': 'echo', 'message': data});
}

function sendReverseToWorker(e) {
    var data = document.getElementById("msg").value;
    myWorker.postMessage({'cmd': 'reverse', 'message': data});
}

function sendStopToWorker(e) {
    var data = document.getElementById("msg").value;
    myWorker.postMessage({'cmd': 'stop', 'message': data});
}


























