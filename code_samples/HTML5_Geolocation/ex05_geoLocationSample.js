window.onload = init;

var watchId = null;
var counter = 0;

// register the event handlers for the buttons

function init() {
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
    
	startButton.onclick = startTrackingLocation;
	stopButton.onclick = stopTrackingLocation;
    
}

function startTrackingLocation() {
    
    // asynchronous call with callback success, 
    // error functions and options specified
    
    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };
    
    // start the position tracking
    watchId = navigator.geolocation.watchPosition(
            displayLocation, handleError, options);
}

function stopTrackingLocation() {

    if (watchId) {
        // stop the position tracking
        navigator.geolocation.clearWatch(watchId);
    }
}

// called repeatedly for updating the position

function displayLocation(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;

    counter++;
    
    document.getElementById("counter").innerHTML = 
            "Update#: " + counter;
    document.getElementById("latitude").innerHTML = 
            "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = 
            "Longitude: " + longitude;
    document.getElementById("accuracy").innerHTML = 
            "Accuracy: " + accuracy + " meters";
    document.getElementById("timestamp").innerHTML = 
            "Timestamp: " + timestamp;
}

// error handler
function handleError(error) {
    switch(error.code) {
        case 1:
            updateStatus("The user denied permission");
            break;
        case 2:
            updateStatus("Position is unavailable");
            break;
        case 3:
            updateStatus("Timed out");
            break;
    }
}

function updateStatus(message) {
    document.getElementById("status").innerHTML = 
        "<strong>Error</strong>: " + message;
}













