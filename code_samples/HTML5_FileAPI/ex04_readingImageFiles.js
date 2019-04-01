 window.onload = init;
 
 function init() {
      var elem = document.getElementById('myfiles');
      elem.addEventListener('change', 
            handleFileSelections, false);
 }
 
 // Process the selections
  function handleFileSelections(evt) {
      // Get the FileList object
    var files = evt.target.files; 

    // Render image files
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      // If not image file, skip
      if (!f.type.match('image.*')) {
        continue;
      }

      // Create a FileReader object
      var reader = new FileReader();

      // Capture the file information using closure (IIFE)
      reader.onload = (function(theFile) {
        return function(e) {
          // Render image.
          var span = document.createElement('span');
          span.innerHTML = '<img src="' + e.target.result + 
                    '" title="' + theFile.name + '" width=300 height=300/>';
          document.getElementById('list').appendChild(span);
          console.log(e.target); // the FileReader object
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

 
