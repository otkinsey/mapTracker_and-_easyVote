window.onload = init;

var src, target, msg;
var sourceId;

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
    sourceId = e.target.id;     // explicitly for some browsers
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
    msg.innerHTML = "Drag ended";
    var elems = document.querySelectorAll(".dragged");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }
}

function dragHandler(e) {
    msg.innerHTML = "Dragging " + e.target.id;
}

function dragEnterHandler(e) {
    console.log("Drag Entering " + e.target.id + 
            " source is " + e.dataTransfer.getData("Text") );
  
    var id = e.dataTransfer.getData("text") || sourceId;
    if (id == "kalathur") {
        e.preventDefault();
    }
}

function dragOverHandler(e) {
    console.log("Drag Over " + e.target.id + 
             " source is " + e.dataTransfer.getData("Text")) ;
  
    var id = e.dataTransfer.getData("text") || sourceId;
    if (id == "kalathur") {
        e.preventDefault();
    }
}

function dropHandler(e) {
    console.log("Drop on " + e.target.id + 
             " source is " + e.dataTransfer.getData("Text")) ;
   
    var id = e.dataTransfer.getData("text") || sourceId;
    var sourceElement = document.getElementById(id);
    var newElement = sourceElement.cloneNode(false);               
    target.innerHTML = "";
    target.appendChild(newElement);
    e.preventDefault();
}






