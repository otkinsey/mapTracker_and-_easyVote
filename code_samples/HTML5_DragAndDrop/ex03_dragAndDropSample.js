window.onload = init;

var  src, target, msg;

function init() {
    src = document.getElementById("src");
    target = document.getElementById("target");
    msg = document.getElementById("msg");

    // Add event handlers for the source
    src.ondragstart = dragStartHandler;
    src.ondragend = dragEndHandler;
    src.ondrag = dragHandler;

    // Add event handlers for the target
    target.ondragenter = dragEnterHandler;
    target.ondragover = dragOverHandler;
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

function dragEnterHandler(e) {
    msg.innerHTML = "Drag Entering " + e.target.id;
    e.preventDefault();
}

function dragOverHandler(e) {
    msg.innerHTML = "Drag Over " + e.target.id;
    e.preventDefault();
}



