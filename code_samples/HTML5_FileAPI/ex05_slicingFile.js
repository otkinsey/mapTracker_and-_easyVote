window.onload = init;

function init() {
    var elem = document.getElementById('myfile');
    elem.addEventListener('change', clearOutput, false);

    var target = document.querySelector('.readButtons');
    target.addEventListener('click', readData, false);
}

function clearOutput(evt) {
    document.getElementById('content').textContent = '';
    document.getElementById('range').textContent = '';
}

function readData(evt) {
    var start = evt.target.getAttribute('data-start');
    var end = evt.target.getAttribute('data-end');
    readBlob(start, end);
}

function readBlob(start, end) {

    var files = document.getElementById('myfile').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    // Select the first file and the positions
    var file = files[0];
    var begin = parseInt(start) || 0;
    var end = parseInt(end) || (file.size - 1);

    // Create a FileReader object
    var reader = new FileReader();

    reader.onload = function(evt) {
        document.getElementById('content').textContent = 
                evt.target.result;
        document.getElementById('range').textContent = 
            'Read bytes: ' +  (begin + 1) +  ' - ' +
               (end + 1) + ' of ' +  file.size + ' byte file.';
    };

    var blob = file.slice(begin, end + 1);
    reader.readAsBinaryString(blob);
}

