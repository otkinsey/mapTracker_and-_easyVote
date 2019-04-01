self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

var counter = 1;

function messageHandler(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'echo' :
            self.postMessage("Worker echos: " + data.message + 
                " #" + counter);
            break;
        case 'reverse' :
            var reversed = data.message.split("").reverse().join("");
            self.postMessage("Worker reverses: " + reversed + 
                " #" + counter);
            break;
        case 'stop' :
            self.postMessage("Worker stopped: " + data.message + 
                " #" + counter);
            self.close(); // terminates the worker
            break;
    }
  counter++;
}

