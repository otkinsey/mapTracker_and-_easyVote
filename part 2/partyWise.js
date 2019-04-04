window.onload = init;
let xhr, draggableItems;
let candidateList = [];


function init(){
    makeRequest("partyList.xml");
    // loadCandidates();
    draggableItems = document.getElementById("members");
    targets = document.getElementsByClassName("dropList");
    // console.log(targets);
    let t = 1;

    /**
     * Add event listeners to targets
     */
    for(i of targets){
        i.id = t;
        i.addEventListener("dragenter", dragEnterHandler);
        i.addEventListener("dragover", dragOverHandler);
        i.addEventListener("drop", dragDropHandler);
        // console.log(`${t} listeners added`);
        t++;
    }

    /**
     * Add event listeners to source elements
     */
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
        
    } else{
        document.getElementById("status").innerHTML = 
            "Candidates could not be loaded";
    }
}

function loadCandidates(){
        if((window.localStorage.length !== 0) && (xhr.readyState == 4)){
            var container;
            for(var i=0;i<10;i++){
                if(window.localStorage.getItem(`${i}_id`)){
                    var localStorageId = window.localStorage.getItem(`${i}_id`);
                    var localStorageClassName = window.localStorage.getItem(`${i}_className`);
                    var localStorageIndex = window.localStorage.getItem(`${i}_index`);
                    var localStorageValue = window.localStorage.getItem(`${i}_value`);
                    var lsListItem = document.createElement("li");
                    lsListItem.draggable = true;
                    lsListItem.id = localStorageId;
                    lsListItem.className = localStorageClassName;
                    lsListItem.setAttribute("index", localStorageIndex);
                    lsListItem.innerHTML = localStorageValue;
                    
                    if(localStorageClassName.includes("Republican")){
                        container = document.getElementById("republicans");
                    } else{
                        container = document.getElementById("democrats");                    
                    }
                    console.log(i);
                    container.appendChild(lsListItem);   
                }         
            }
        }
        if((xhr.readyState == 4)){
            // console.log(xhr);
            let candidates = xhr.responseXML.getElementsByTagName("senator");
            let memberList = document.getElementById("members");
            let candidateIndex = 0;
            for(c of candidates){
    
                let name = c.getElementsByTagName("name")[0];
                // console.log(name.innerHTML);
                let party = c.getElementsByTagName("party")[0];
                let newCandidate = {
                    name: name.innerHTML,
                    party: party.innerHTML,
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
                memberListItem.className = `${newCandidate.party} member`;
                memberListItem.id = newCandidate.name.replace(" ", "_");
                memberListItem.setAttribute("index", candidateIndex);
                candidateIndex++;
                memberListItem.innerHTML = `${newCandidate.name}`;
                memberList.appendChild(memberListItem);
            }  
        }
    console.log(candidateList.length);
}

/**
 *  dragSource event handlers
 */
let dragStartHandler = (e)=>{
    e.dataTransfer.setData("id", e.target.id);
    // e.dataTransfer.setData("classList", e.target.classList);
    e.target.classList.add("dragged");
    // console.log(JSON.stringify(e.target.classList));
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
    e.dataTransfer.getData("id");
    e.preventDefault();
}
let dragOverHandler = (e)=>{
    e.preventDefault();
}
let dragDropHandler = (e)=>{
    let id = e.dataTransfer.getData("id");
    let sourceElement = document.getElementById(id);
    let newElement = sourceElement.cloneNode(false);
    let selectedCandidate = candidateList[newElement.getAttribute("index")];
    newElement.innerHTML = id.replace("_", " ");

    if(newElement.classList.value.includes("Republican") && (e.target.id == "republicans")){
        e.preventDefault();
        e.target.appendChild(newElement);
    }
    else if(newElement.classList.value.includes("Democrat") && (e.target.id == "democrats")){
        e.preventDefault();
        e.target.appendChild(newElement);
    }
 
    selectedCandidate.voted = true;
    window.localStorage.setItem(`${newElement.getAttribute("index")}_id`, newElement.id);
    window.localStorage.setItem(`${newElement.getAttribute("index")}_className`, newElement.className);
    window.localStorage.setItem(`${newElement.getAttribute("index")}_index`, newElement.getAttribute("index"));
    window.localStorage.setItem(`${newElement.getAttribute("index")}_value`, newElement.innerHTML);
    if(candidateList[newElement.getAttribute("index")].voted){
        window.localStorage.setItem(`${newElement.getAttribute("index")}_voted`, true);
    }else{
        window.localStorage.setItem(`${newElement.getAttribute("index")}_voted`, false);
    }
    

    console.log(selectedCandidate);
}




