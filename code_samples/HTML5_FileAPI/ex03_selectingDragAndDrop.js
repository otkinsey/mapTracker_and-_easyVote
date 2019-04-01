window.onload = init;

function init() {
    // Setup the listeners on the target
    var target = document.getElementById('target');
    target.addEventListener('dragover', 
            handleDragOver, false);
    target.addEventListener('drop', 
            handleFileSelections, false);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function handleFileSelections(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // Get the FileList object.
    var files = evt.dataTransfer.files;
    
    var output = '';
    
    // Select each File and its attributes
    for (var i = 0; i < files.length; i++) {
      var f = files.item(i);
      output += '<li><em>' + f.name + '</em>';
      output += ', Type: ' + f.type;
      output += ', Size: ' + f.size + ' bytes';
      output += ', Modified: ' + 
        f.lastModifiedDate.toLocaleString() + '</li>';
    }
    
    // Show the selections
    document.getElementById('list').innerHTML = 
      '<ul>' + output + '</ul>';
}



