// add listeners on storage events
window.addEventListener("storage", displayStorageEvent, false);
// or
// window.onstorage = displayStorageEvent;

// display new storage events
function displayStorageEvent(e) {

    var items = document.getElementById("items");
    // create a line item and add to the end of the list
    var item = document.createElement("li");
    item.innerHTML = "key:" + e.key + 
        ", newValue:" + e.newValue + 
        ", oldValue:" + e.oldValue + 
        ", url:" + e.url;

    items.appendChild(item);
}
