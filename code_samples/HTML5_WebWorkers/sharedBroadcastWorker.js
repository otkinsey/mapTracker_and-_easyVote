 
var connections = 0; // count active connections  
var viewers = {}; // store all connections
self.onconnect = connectionHandler;

function connectionHandler(e) {
   var port = e.ports[0];  
   connections++; 
   port._name = "Client" + connections;
   viewers[port._name] = port;
    
   port.addEventListener("message", function(e) {  
       // Broadcast the message to each client
       for (var viewer in viewers)
       {
         viewers[viewer].postMessage(e.target._name + ": " + e.data); 
       } 
     
    });
   
   port.start();  
}



