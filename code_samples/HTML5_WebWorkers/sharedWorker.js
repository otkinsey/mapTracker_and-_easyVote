 
var connections = 0; // count active connections  
self.onconnect = connectionHandler;

function connectionHandler(e) {
   var port = e.ports[0];  
   connections++;  
   port.addEventListener("message", function(e) {  
       port.postMessage("Worker echos " + e.data +
        " (On port #" + connections + ")");  
    
    });
   port.start();  
}


