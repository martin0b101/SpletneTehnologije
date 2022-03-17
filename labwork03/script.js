"use strict";

function domRemoveParticipant(event) {
    let nameOfPerson = event.firstElementChild.innerHTML;
    let textForDelete = "Are you sure u want to delete " + nameOfPerson +"?" ;
    if (confirm(textForDelete) == true) {
        event.remove(); 
    }
    
    //localStorage.removeItem(event);
}

function domAddParticipant(participant) {
    const table = document.querySelector("#participant-table");
    const tr = document.createElement("tr");
    table.appendChild(tr);

    tr.addEventListener('dblclick', () =>{
        domRemoveParticipant(tr);
    });
    
    for (const key in participant){
        const td = document.createElement("td");
        td.innerText = participant[key];
        
        tr.appendChild(td);
        
    }
    
    
}

function addParticipant(event) {
    
    const first = document.querySelector("#first").value;
    const last = document.querySelector("#last").value;
    const role = document.querySelector("#role").value;
    
    
    
    document.querySelector("#first").value = "";
    document.querySelector("#last").value = "";
    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    localStorage.setItem("participant", JSON.stringify(participant));

    // Add participant to the HTML
    domAddParticipant(participant);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addButton").onclick = addParticipant;
    //document.body.addEventListener("dblclick", domRemoveParticipant(window.ondblclick));
    

})


