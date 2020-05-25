window.onload = init;

function init(){
    renderAssignments();
    renderTodoList();
}



function showParticipantModal(){
    document.getElementById('add-participant-modal').style.display = 'block';
}
function closeParticipantModal() {
    document.getElementById('add-participant-modal').style.display = "none";
}
function showTodoModal(){
    document.getElementById("addTodoModal").style.display = 'block';
}
function closeTodoModal(){
    document.getElementById('addTodoModal').style.display = 'none';
}


function submitModal(e){
    e.preventDefault();
    const firstName = document.querySelector("[name='fname']").value;
    const lastName = document.querySelector("[name='lname']").value;
    const email = document.querySelector("[name='email']").value;

    const listOfUsers = JSON.parse(window.localStorage.getItem('user')) || [];

    const participant = {firstName, lastName, email};
    console.log(participant);
    listOfUsers.push(participant);
    window.localStorage.setItem('user', JSON.stringify(listOfUsers));
    renderParticipants();
    closeParticipantModal();
}

function renderParticipants(){
    participants = JSON.parse(window.localStorage.getItem('user')) || [];
    const memberList = document.getElementById("project-members");
    //Printing all names to the screen for each participant in localStorage using the forEach methord with an arrow function
    participants.forEach(participant => {
        console.log(participant.firstName);
        memberList.innerHTML += `
            <div><p>${participant.firstName} ${participant.lastName} ${participant.email}</p></div>
        `;
    })
}

function submitTodoModal(event) {
    event.preventDefault();

    var listOfTasks = JSON.parse(window.localStorage.getItem('listOfTasks')) || [];

    const toDoList = document.getElementById('to-do-list');
    const taskName = document.querySelector("[name='task']").value;
    const radiobuttons = document.querySelectorAll("[name='importance']");
    var taskImportance;

    for (const radiobutton of radiobuttons){
        if(radiobutton.checked){
            taskImportance = parseInt(radiobutton.value);

            break;
        }
    }

    switch(taskImportance){
        case 0:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#00ff00;">${taskName}</div>`;
            taskImportance = '#00ff00';
            break;
        case 1:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#ffff00;">${taskName}</div>`;
            taskImportance = 'ffff00';
            break;
        case 2:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#ff0000;">${taskName}</div>`;
            taskImportance = '#ff0000';
            break;
        default:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#ffff00;">${taskName}</div>`;
            taskImportance = '#ffff00';
            break;
    }
    

    const task = {taskName, taskImportance};
    console.log(task);
    listOfTasks.push(task);

    window.localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

}

function renderTodoList() {
    const listOfTasks = JSON.parse(window.localStorage.getItem('listOfTasks')) || [];
    const toDoList = document.getElementById('to-do-list');

    for (var i=0; i<listOfTasks.length; i++) {
        toDoList.innerHTML += `<p id="draggable${i}" class="task-p-class" draggable="true" ondragstart="drag(event)">${listOfTasks[i].taskName}</p>`
    }
}
function renderAssignments(){
    const assignmentField = document.getElementById('calender-table');
    const daysHeader = document.getElementById('days-header');

    //Her må det komme en funksjon som henter antall dager prosjektet er, og lagre det antallet dager

    //Her må det komme en funksjon som henter antall medlemmer det er i prosjektet
    var numberOfUsers = ['Henrik', 'Elise', 'Iselin', 'Raheel'];

    daysHeader.innerHTML = `
        <tr>
            <th class="test id=day">1</th>
            <th class="test">2</th>
            <th class="test">3</th>
        </tr>
    `;
    for (var i = 0; i < numberOfUsers.length; i++){
        assignmentField.innerHTML += `
        <tr>
            <th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
            <th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
            <th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
        </tr>
    `
    }

}

function allowDrop(ev){
    ev.preventDefault();

}
function drag(ev){
    ev.dataTransfer.setData('text/html', ev.target.id);
}
function drop(ev){
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text/html");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "newId";
    ev.target.appendChild(nodeCopy);
    console.log("hei"); 
}
//Left her
function saveTaskAssignment(){
    const assignedTasks = document.getElementsByClassName('container');
    var taskAssignement = JSON.parse(window.localStorage.getItem('allocation')) || [];
    

    


    for (var i = 0; i < assignedTasks.length; i++){
        console.log(assignedTasks[i].getElementsByTagName('p')[0].innerHTML);

        localStoageRef.push([[assignedTasks[i].getElementsByTagName('p')[0].innerHTML]]);
        console.log(localStoageRef);

    }
        console.log(localStoageRef);
    
        window.localStorage.setItem('allocation', JSON.stringify(localStoageRef));
}
