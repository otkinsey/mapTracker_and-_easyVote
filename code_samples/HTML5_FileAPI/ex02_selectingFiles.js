window.onload = init;

function init() {
    var elem = document.getElementById('myfiles');
    elem.addEventListener('change', 
            handleFileSelections, false);
}

function handleFileSelections(evt) {
    // Get the FileList object
    var files = evt.target.files; 
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


