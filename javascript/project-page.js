window.onload = init;

var projectApp = {};

function init(){
    renderSelectedProject();
    renderAssignments();
    renderTodoList();
    renderParticipants();
}

function showParticipantModal(){
    document.getElementById('add-participant-modal').style.display = 'flex';
}
function closeParticipantModal() {
    document.getElementById('add-participant-modal').style.display = "none";
}
function showTodoModal(){
    document.getElementById("addTodoModal").style.display = 'flex';
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

    console.log(selectedProject);

    const duration = getDateDifference();
    console.log(duration);
    
}

function getDateDifference(){
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    
    var startDate = new Date(projectApp.selectedProject.date);
    var endDate = new Date(projectApp.selectedProject.endDate);
    console.log(endDate);
    

    var startMonth = startDate.getMonth();
    var endMonth = endDate.getMonth();

    var startDayNumber = startDate.getDate()
    var endDayNumber = endDate.getDate();
    console.log(startDayNumber);


    if(startMonth === endMonth){
        projectApp.selectedProject.duration = endDate.getDate() - startDate.getDate();  
    }
    if(endMonth > startMonth){
        if(startMonth == 0 || startMonth == 2 || startMonth == 4 || startMonth == 6 || startMonth == 7 || startMonth == 9 || startMonth == 11){
            daysInStartMonth = 31;

            console.log(startDayNumber, endDayNumber);
            var daysLeftInStartMonth = daysInStartMonth - startDayNumber;
            var totalDays = daysLeftInStartMonth + endDayNumber;

            projectApp.selectedProject.duration = totalDays;

        } else if (startMonth != 1) {
            daysInStartMonth = 30;

            console.log(startDayNumber, endDayNumber);
            var daysLeftInStartMonth = daysInStartMonth - startDayNumber;
            var totalDays = daysLeftInStartMonth + endDayNumber;

            projectApp.selectedProject.duration = totalDays;
            //Checks if the current year is a leap year, and if the projects start month is February. If both is true the daysInstartMonth will have 29 days
        } else if (((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0) && (startMonth == 1)){
            daysInStartMonth = 29;
            console.log(startDayNumber, endDayNumber);
            var daysLeftInStartMonth = daysInStartMonth - startDayNumber;
            var totalDays = daysLeftInStartMonth + endDayNumber;
            projectApp.selectedProject.duration = totalDays;
        }
    }
    return projectApp.selectedProject.duration;
}


function submitModal(e){
    e.preventDefault();
    var currentProject = projectApp.selectedProject;
    var projectList = projectApp.allProjects;1  

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
    e.target.reset();
    renderParticipants();
    closeParticipantModal();
}

function renderParticipants(){
    participants = projectApp.selectedProject.users || [];

    const memberList = document.getElementById("project-members-memb");
    memberList.innerHTML = "";
    //Printing all names to the screen for each participant in localStorage using the forEach methord with an arrow function
    for (var i = 0; i < participants.length;i++){
        memberList.innerHTML += `
            <div><p>${participants[i].firstName} ${participants[i].lastName}</p></div>
        `;
    }
}

function submitTodoModal(event) {
    event.preventDefault();

    var currentProject = projectApp.selectedProject;
    var projectList = projectApp.allProjects;

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
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#E2F0CB;">${taskName}</div>`;
            taskImportance = '#E2F0CB';
            break;
        case 1:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#fffcbb;">${taskName}</div>`;
            taskImportance = '#fffcbb';
            break;
        case 2:
            toDoList.innerHTML += `<div class="task-p-class" style="background-color:#FFB7B2;">${taskName}</div>`;
            taskImportance = '#FFB7B2';
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
    projectList[currentProject.indexLocation].tasks = listOfTasks;

    window.localStorage.setItem('projects', JSON.stringify(projectList));
    console.log(projectApp);
    
    //window.localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    closeTodoModal();
    event.target.reset();

}

function renderTodoList() {
    //const listOfTasks = JSON.parse(window.localStorage.getItem('listOfTasks')) || [];
    var listOfTasks = projectApp.selectedProject.tasks || [];
    console.log(listOfTasks);
    
    const toDoList = document.getElementById('to-do-list-tasks');

    for (var i=0; i<listOfTasks.length; i++) {
        toDoList.innerHTML += `<p style="background-color:${listOfTasks[i].taskImportance};" id="draggable${i}" class="task-p-class" draggable="true" ondragstart="drag(event)">${listOfTasks[i].taskName}</p>`
    }
}
function renderAssignments(){
    const assignmentField = document.getElementById('calender-table');
    const daysHeader = document.getElementById('days-header');

    var listOfUsers = projectApp.selectedProject.users || [];

    //Her må det komme en funksjon som henter antall dager prosjektet er, og lagre det antallet dager
    var lengthInDays = getDateDifference();
    console.log(lengthInDays);
    
    //Her må det komme en funksjon som henter antall medlemmer det er i prosjektet
   var firstTBody = document.getElementById("calender-table").getElementsByTagName("tbody")[0];
   firstTBody.classList.add("firstTBody");

    daysHeader.innerHTML = `
        <th id="dateDisplay" class="name-column">

        </th>
    `;

    console.log(daysHeader);

    var dateDisplay = document.getElementById('dateDisplay');
    const participants = projectApp.selectedProject.users || 0;
    console.log(participants);
    
    if (participants == 0){
        daysHeader.innerHTML = `<h2 style="margin:auto;font-size:4rem;">Legg til brukere for å begynne!</<h2>`;
        console.log("HEi");
        
    } else {
        for (var i = 0; i < lengthInDays; i++){
            daysHeader.innerHTML += `
                <th class="test">${i}</th>
            `;
        }
    }

    console.log(listOfUsers);
    for (var i = 0; i < listOfUsers.length; i++){
        assignmentField.innerHTML += `
            <tr id="participantColumn${i}" class="task-row">
                <th id="participantName${i}" class="test name-column" ><a href="mailto:${participants[i].email}">${listOfUsers[i].firstName}</th>
            </tr>
        `;
       
        for (var j = 0; j < lengthInDays;j++){
            var participantColumn = document.getElementById(`participantColumn${i}`);
            participantColumn.classList.add("calender-name-container");
            if (projectApp.selectedProject.taskAllocation) {
                
                if (projectApp.selectedProject.taskAllocation.length < projectApp.selectedProject.users.length){
                    var oldAssignments = projectApp.selectedProject.taskAllocation;
                    oldAssignments.push([])
                    for ( var k = 0; k < projectApp.selectedProject.duration;k++){
                        oldAssignments[oldAssignments.length-1].push([]);
                    }
                    projectApp.selectedProject.taskAllocation = oldAssignments;
                }
                participantColumn.innerHTML += `
                <th class="task-container container${i}${j}" ondrop="drop(event)" ondragover="allowDrop(event)">${projectApp.selectedProject.taskAllocation[i][j]}</th>
            `;
            } else {
                participantColumn.innerHTML += `
                <th class="task-container container${i}${j}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
            `;
            }
            
        }


       // assignmentField.innerHTML += `
        //<tr>
            //<th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
            //<th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
            //<th class="test container container${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></th>
        //</tr>
   // `
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
    saveTaskAssignment();
}

function saveTaskAssignment(){
    var currentProject = projectApp.selectedProject;
    var projectList = projectApp.allProjects;
    //projectApp.selectedProject.taskAllocation = [];
    
    var multiArray = [];
    

    for (var i = 0; i < projectApp.selectedProject.users.length; i++){
        multiArray.push([])
        var participantColumn = document.getElementById(`participantColumn${i}`)
        for (var j = 1; j < projectApp.selectedProject.duration + 1; j++){
            dayColumn = participantColumn.getElementsByTagName("th")[j];
            multiArray[i].push([dayColumn.innerHTML]);          
        }
        
        //console.log(containers[i]);
        //projectList[projectApp.selectedProject.indexLocation].taskAllocation.push([containers[i].innerHTML]);
    }
    window.localStorage.setItem('arrayTest', JSON.stringify(multiArray));
    console.log(multiArray);

    projectList[currentProject.indexLocation].taskAllocation = multiArray;
    
    window.localStorage.setItem('projects', JSON.stringify(projectList));

    /*for (var i = 0; i < assignedTasks.length; i++){
        console.log(assignedTasks[i].getElementsByTagName('p')[0].innerHTML);

        localStoageRef.push([[assignedTasks[i].getElementsByTagName('p')[0].innerHTML]]);
        console.log(localStoageRef);

    }
        console.log(localStoageRef);
    
        window.localStorage.setItem('allocation', JSON.stringify(localStoageRef)); */
}