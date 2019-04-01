window.onload = init;

var  src, msg;

function init() {
    src = document.getElementById("src");
    msg = document.getElementById("msg");
    
    // Add event handlers
    src.ondragstart = dragStartHandler;
    src.ondragend   = dragEndHandler;
    src.ondrag      = dragHandler;
}

function dragStartHandler(e) {
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
    e.target.classList.remove("dragged");
    msg.innerHTML = "Drop Here";
}

function dragHandler(e) {
    msg.innerHTML = "Dragging " + e.target.id;
}
