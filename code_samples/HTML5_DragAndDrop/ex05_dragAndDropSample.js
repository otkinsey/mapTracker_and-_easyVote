window.onload = init;

var src, target, msg;

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
    target.ondrop = dropHandler;

}

function dragStartHandler(e) {
    e.dataTransfer.setData("Text", e.target.id);
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
    msg.innerHTML = "Drop over the target";
    var elems = document.querySelectorAll(".dragged");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }
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

function dropHandler(e) {
    var sourceId = e.dataTransfer.getData("Text");  
    var sourceElement = document.getElementById(sourceId);
    var newElement = sourceElement.cloneNode(false);               
    target.innerHTML = "";
    target.appendChild(newElement);
    e.preventDefault();
}








