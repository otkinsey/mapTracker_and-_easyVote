window.onload = init;

function init() {
	var addButton = document.getElementById("addButton");
	addButton.onclick = addItem;
	var remButton = document.getElementById("remButton");
	remButton.onclick = removeItem;
	var clrButton = document.getElementById("clrButton");
	clrButton.onclick = clearItems;

	updateDOMItems();
}

function addItem(e) {
	var key = document.getElementById("key").value;
	var value = document.getElementById("value").value;

    // add item to session storage
	window.sessionStorage.setItem(key, value);

	updateDOMItems();
}

function removeItem(e) {
	var key = document.getElementById("key").value;
	
	// remove item from session storage
	window.sessionStorage.removeItem(key);
    
    updateDOMItems();
}

function clearItems() {
    // clear session storage
    window.sessionStorage.clear();

    updateDOMItems();
}

function updateDOMItems() {
    var itemsList = document.getElementById("items");
    // Clear shown list
    itemsList.innerHTML = '';
    // Add current items to the list
    for (key in window.sessionStorage) {
        addItemToDOM(key, sessionStorage[key]);
    }   
}

function addItemToDOM(key, value) {
    var items = document.getElementById("items");
    // create a line item and add to the end of the list
    var item = document.createElement("li");
    item.innerHTML = key + ": " + value;
    
    items.appendChild(item);
}










