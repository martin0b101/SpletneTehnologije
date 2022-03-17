"use strict";
let id = 1;

function domRemoveParticipant(event) {
    let nameOfPerson = event.firstElementChild.innerHTML;
    let textForDelete = "Are you sure u want to delete " + nameOfPerson +"?" ;
    let tableLocalStorage = JSON.parse(localStorage.getItem("participants"));
    
    if (confirm(textForDelete) == true) {
        //find element to delete in localStorage
        for (let i = 0; i<tableLocalStorage.length; i++){
            if (tableLocalStorage[i].first == nameOfPerson) {
                tableLocalStorage.splice(i, 1);
                console.log(tableLocalStorage);
            }
        }
        //update local storage
        localStorage.setItem("participants", JSON.stringify(tableLocalStorage));
        event.remove(); 
        id -= 1;
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
        if (key !== 'id') {
            const td = document.createElement("td");
            td.innerText = participant[key];
            tr.appendChild(td);
        }
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
        role: role,
        id: id
    };

    const arrayForLocalStroga = [participant];
    if (localStorage.getItem('participants') ==null) {
        localStorage.setItem("participants", JSON.stringify(arrayForLocalStroga));
    }
    else{
        let dataInLocalStorage = JSON.parse(localStorage.getItem("participants"));
        console.log(dataInLocalStorage);
        dataInLocalStorage.push(participant);
        localStorage.setItem('participants', JSON.stringify(dataInLocalStorage));
    }

    console.log(participant.id);
    id += 1;
    // Add participant to the HTML
    domAddParticipant(participant);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addButton").onclick = addParticipant;
    if (localStorage.getItem('participants') !== null) {
        //dodaj v tabelo 
        let tableOfParticipants = JSON.parse(localStorage.getItem('participants'));
        for (let i = 0; i<tableOfParticipants.length; i++){
            domAddParticipant(tableOfParticipants[i]); 
        }
    }
    
    //document.body.addEventListener("dblclick", domRemoveParticipant(window.ondblclick));
    

})


