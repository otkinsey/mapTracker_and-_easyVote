window.onload = init;

var latitude, longitude;
var map = null;
var path = [];
var lastMarker = null;

function init(){
    var checkButton = document.getElementById("startButton");
    var stopButton = document.getElementById("stopButton");
    var interval;

    checkButton.onclick = ()=>{ interval = window.setInterval(showSimplePath, 3000); console.log("start"); };
    stopButton.onclick = ()=>{window.clearInterval(interval); console.log("stop"); };
}

function getLocation(){
    var options = {
        enableHighAccuracy:true,
        timeout: 17000,
        maximumAge:0
    }

    navigator.geolocation.getCurrentPosition(
        displayLocation, handleError, options
    );
}

function displayLocation(position){
    latitude = position.coords.latitude;
    longitude = position.coords.latitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;

    document.getElementById("latitude").innerHTML = `latitude: ${latitude} `;
    document.getElementById("longitude").innerHTML = `longitude: ${longitude} `;
    document.getElementById("accuracy").innerHTML = `accuracy: ${accuracy} `;
    document.getElementById("timestamp").innerHTML = `timestamp: ${timestamp} `;

    showOnMap(position.coords);
}

function handleError(error){
    switch(error.code){
        case 1:
            updateStatus("The user denied permission");
            break;
        case 2:
            updateStatus("Positionis unavailable");
            break;
        case 3:
            updateStatus("Timed out");
            break;        
    }
}

function updateStatus(message){
    document.getElementById("status").innerHTML = 
        "<strong>Error: </strong>"+ message;
}

function showOnMap(pos){
    var googlePosition = 
        new google.maps.LatLng(pos.latitude, pos.longitude);
    
    var mapOptions = {
        zoom:15,
        center:googlePosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);

    var title = "Location Details"
    var content = "Lat: "+pos.latitude +
                    ", Lng: "+pos.longitude;
    
    addMarker(map, googlePosition, title, content);
}

function addMarker(map, position, title, content){
    var options = {
        position: position,
        map: map,
        title: title,
        clickable:true
    };
    return marker = new google.maps.Marker(options);  
}

function showSimplePath(){
    path = [];

    var latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    latitude += Math.random()/250;
    longitude -= Math.random()/250;

    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    var line = new google.maps.Polyline({
        path: path,
        strokeColor: "#ff0000",
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    line.setMap(map);
    map.panTo(latlong);

    if(lastMarker){
        lastMarker.setMap(null)
    }
    lastMarker = addMarker(map, latlong);
}