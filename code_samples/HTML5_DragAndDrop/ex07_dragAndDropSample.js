window.onload = init;

var target;

function init() {
    target = document.getElementById("target");

    // Add event handlers
    target.ondragenter = handleDrag;
    target.ondragover = handleDrag;
    target.ondrop = handleDrop;
}

function handleDrag(e) {
    e.preventDefault();
}

function handleDrop(e) {
    var fileList = e.dataTransfer.files;
    var tableHTMLElem = document.getElementById("fileData");
    tableHTMLElem.innerHTML = 
     "<tr><th>FileName</th><th>FileSize (bytes)</th><th>FileType</th></tr>";
          
    for(var i = 0; i < fileList.length; i++) {
        var tableRow = "<tr><td>" + 
            fileList[i].name + "</td><td>" + 
            fileList[i].size + "</td><td>" + 
            fileList[i].type + "</td></tr>";
        tableHTMLElem.innerHTML += tableRow;
    }
    e.preventDefault();
}

