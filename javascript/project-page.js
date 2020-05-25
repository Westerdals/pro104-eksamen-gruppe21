window.onload = init;

var projectApp = {};

function init(){
    renderSelectedProject();
    renderAssignments();
    renderTodoList();
    renderParticipants();
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

function renderSelectedProject(){
    var selectedProject = JSON.parse(window.sessionStorage.getItem('projectForForwadring'));
    var allProjects = JSON.parse(window.localStorage.getItem('projects'));

    for (var i = 0; i < allProjects.length; i++){
        if(allProjects[i].name == selectedProject.projectName) {
            selectedProject = allProjects[i];
            projectApp.selectedProject = allProjects[i];
            projectApp.selectedProject.indexLocation = i;
            projectApp.allProjects = allProjects;
        }
    }


    document.getElementById('toptext').innerHTML = selectedProject.name;


}



function submitModal(e){
    e.preventDefault();
    var currentProject = projectApp.selectedProject;
    var projectList = projectApp.allProjects;

    const firstName = document.querySelector("[name='fname']").value;
    const lastName = document.querySelector("[name='lname']").value;
    const email = document.querySelector("[name='email']").value;

    var listOfUsers = projectApp.selectedProject.users || [];
    console.log(listOfUsers);
    var  participant = {firstName, lastName, email};
    
    listOfUsers.push(participant);
    console.log(listOfUsers);

    projectApp.selectedProject.users = listOfUsers;
    projectList[currentProject.indexLocation].users = listOfUsers;

    window.localStorage.setItem('projects', JSON.stringify(projectList));

   /* for (var i = 0;i<projectList.length;i++){
        if (projectList[i].name == currentProject.projectName){
            projectList[i].users = listOfUsers;
            window.localStorage.setItem('projects', JSON.stringify(projectList));
            currentProject = JSON.parse(window.localStorage.getItem('projects'));
        }
    }

*/
    
    console.log(currentProject);



    
    renderParticipants();
    closeParticipantModal();
}

function renderParticipants(){
    participants = projectApp.selectedProject.users || [];
    const memberList = document.getElementById("project-members-memb");
    //Printing all names to the screen for each participant in localStorage using the forEach methord with an arrow function
    for (var i = 0; i < participants.length;i++){
        memberList.innerHTML += `
            <div><p>${participants[i].firstName} ${participants[i].lastName} ${participants[i].email}</p></div>
        `;
    }
}

function submitTodoModal(event) {
    event.preventDefault();

    // var listOfTasks = JSON.parse(window.localStorage.getItem('listOfTasks')) || [];
    var listOfTasks = projectApp.selectedProject.tasks || [];

    const toDoList = document.getElementById('to-do-list-tasks');
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
            taskImportance = '#ffff00';
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
    projectApp.selectedProject.tasks = listOfTasks;
    console.log(projectApp);
    //window.localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

}

function renderTodoList() {
    //const listOfTasks = JSON.parse(window.localStorage.getItem('listOfTasks')) || [];
    var listOfTasks = projectApp.selectedProject.tasks || [];
    const toDoList = document.getElementById('to-do-list-tasks');

    for (var i=0; i<listOfTasks.length; i++) {
        toDoList.innerHTML += `<p style="background-color:${listOfTasks[i].taskImportance};" id="draggable${i}" class="task-p-class" draggable="true" ondragstart="drag(event)">${listOfTasks[i].taskName}</p>`
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
    ev.dataTransfer.setData('text', ev.target.id);
}
function drop(ev){
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "newId";
    ev.target.appendChild(nodeCopy);
    console.log("hei"); 
}

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
