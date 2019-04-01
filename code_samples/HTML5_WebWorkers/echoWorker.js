self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

var counter = 1;

function messageHandler(e) {
  postMessage("Worker echos " + e.data + 
                " too #" + counter);
  counter++;
}

