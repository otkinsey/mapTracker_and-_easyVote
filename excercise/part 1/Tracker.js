/**
 * REQUIREMENTS:
 *  - generate random values to increment/decrement latitude and 
 *    longitude values as described in instructions
 *  - increment the latitude and decrement the longitude
 *  - 
 */

 window.onload = init;
 var flightPath = [];
 function init(){
     var startButton = document.getElementById('checkButton');
     startButton.onclick = getLocation;
 }

//  generate incremental values for latitude and longitude
function updateMyLocation(){
    var lat = Math.random()/100;
    var lng = Math.random()/100;
    var coords = {lat: lat, lng:lng}
    flightPath.push(coords);
    
    return flightPath;
}

//  get initial position
function getLocation(){
    const options = { maximumAge: 0, 
                      enableHighAccuracy:false, 
                      timeout: 6000 }
    // console.log('click');
    window.setInterval(()=>{ navigator.geolocation.getCurrentPosition(success, error, options) }, 6000);
}

function success(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;
    var infoCollection = document.getElementsByClassName('appInfo');

    /**
     * iterate over all appInfo DOM elements and set them an empty string
     */
    for(i of infoCollection){
        i.innerHTML = `${i.id}: `;
    }
    // console.log(`lat:${latitude} lng: ${longitude}`);

    /**
     * set values for appInfo DOMelements
     */
    document.getElementById('latitude').innerHTML += latitude;
    document.getElementById('longitude').innerHTML += longitude;
    document.getElementById('accuracy').innerHTML += accuracy;
    document.getElementById('timestamp').innerHTML += timestamp;
    renderMap(position.coords);
    // window.setInterval(function(){ console.log('interval set'); }, 1000)
}

function error(error){
    console.log(`Error ${error.code}: ${error.message}`);
}

function renderMap(pos){
    var googlePosition = new google.maps.LatLng(pos.latitude, pos.longitude);
    var mapOptions = { 
        zoom:15, 
        center:googlePosition, 
        mapTypeId:google.maps.MapTypeId.ROADMAP 
    }; 
    
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var title = "Location Details";
    var content = `Lat: ${pos.latitude} | Lng: ${pos.longitude}`;
    addMarker(map, googlePosition, title, content);
    var newCoordsInc = updateMyLocation();
    var updatedFlightPath = [];

    for(i of flightPath){
        if(updatedFlightPath.length == 0){
            updatedFlightPath.push(
                {
                    lat: pos.latitude,
                    lng: pos.longitude
                });
                console.log('first value');
        }else{
            updatedFlightPath.push(
                {
                    lat: updatedFlightPath[updatedFlightPath.length-1].lat+newCoordsInc[newCoordsInc.length-1].lat,
                    lng: updatedFlightPath[updatedFlightPath.length-1].lng-newCoordsInc[newCoordsInc.length-1].lng
                });
        }
    }
    console.log(`lat inc: ${newCoordsInc[newCoordsInc.length-1].lat} | lng inc: ${newCoordsInc[newCoordsInc.length-1].lng} `);
    console.log(`updated lat pos: ${updatedFlightPath[updatedFlightPath.length-1].lat} | updated lng pos: ${updatedFlightPath[updatedFlightPath.length-1].lng} `);
    console.log(updatedFlightPath);
    // var newCoords =
    var pline = new google.maps.Polyline({
        path: updatedFlightPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    pline.setMap(map);
}

function addMarker(map, latlng, title, content){
    var options = {
        position: latlng,
        map: map,
        title: title,
        content: content
    }
    // console.log(latlng);
    var marker = new google.maps.Marker(options);
}