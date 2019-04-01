window.onload = init;

// register the event handler for button

function init() {
	var checkButton = document.getElementById("checkButton");
	checkButton.onclick = getLocation;
}

function getLocation() {

    // asynchronous call with callback function specified
    navigator.geolocation.getCurrentPosition(displayLocation);

}

// callback function on success
function displayLocation(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;

    document.getElementById("latitude").innerHTML = 
            "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = 
            "Longitude: " + longitude;
    document.getElementById("accuracy").innerHTML = 
            "Accuracy: " + accuracy + " meters";
    document.getElementById("timestamp").innerHTML = 
            "Timestamp: " + timestamp;
}














