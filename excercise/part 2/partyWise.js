let xhr, draggableItems;
let candidateList = [];


function init(){
    makeRequest("partyList.xml");
    draggableItems = document.getElementById("members");
    targets = document.getElementsByClassName("dropList");
    // console.log(targets);
    let t = 1;
    for(i of targets){
        i.id = t;
        i.addEventListener("dragenter", dragEnterHandler);
        i.addEventListener("dragover", dragOverHandler);
        i.addEventListener("drop", dragDropHandler);
        t++;
    }

    draggableItems.addEventListener("dragstart", dragStartHandler, false);
    draggableItems.addEventListener("drag", dragHandler, false);
    draggableItems.addEventListener("dragend", dragEndHandler, false);

}

function makeRequest(url){
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xhr){
        xhr.onreadystatechange = loadCandidates;
        xhr.open("GET", url, true);
        xhr.send();
        loadCandidates();
    } else{
        document.getElementById("status").innerHTML = 
            "Candidates could not be loaded";
    }
}

function loadCandidates(){
    if(xhr.readyState == 4){
        // console.log(xhr);
        let candidates = xhr.responseXML.getElementsByTagName("senator");
        let memberList = document.getElementById("members");
        for(c of candidates){

            let name = c.getElementsByTagName("name")[0];
            let party = c.getElementsByTagName("party")[0];
            let newCandidate = {
                name: name,
                party: party,
                voted: false
            }

            /**
             * add candidate object to candidateList array
             */
            candidateList.push(newCandidate);

            /**
             *  add candidate name to members list
             */
            let memberListItem = document.createElement("li");
            memberListItem.draggable = true;
            memberListItem.className = `${newCandidate.party.innerHTML} member`;
            memberListItem.id = newCandidate.name.innerHTML.replace(" ", "_");
            memberListItem.innerHTML = `${newCandidate.name.innerHTML}`;
            memberList.appendChild(memberListItem);
        }  
    }
    // console.log(candidateList);
}

/**
 *  dragSource event handlers
 */
let dragStartHandler = (e)=>{
    e.dataTransfer.setData("id", e.target.id);
    e.target.classList.add("dragged");
    // console.log("drag start");
}
let dragEndHandler = (e)=>{ 
    e.target.classList.remove("dragged");   
    // console.log("drag ended"); 
}

let dragHandler = (e)=>{
    // console.log("dragging")
}
    
/**
 *  dragTarget event handlers
 */
let dragEnterHandler = (e)=>{
    e.dataTransfer.getData("text");
    e.preventDefault();
    console.log("drag enter");
}
let dragOverHandler = (e)=>{
    console.log("drag over");
}
let dragDropHandler = (e)=>{
    let id = e.dataTransfer.getData("id");
    let sourceElement = document.getElementById(id);
    let newElement = sourceElement.cloneNode(false);
    e.target.appendChild(newElement);
    console.log("dropped");
    e.preventDefault();
}


window.onload = init;
