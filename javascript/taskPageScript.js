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
        toDoList.innerHTML += `<div><p draggable="true">${listOfTasks[i].taskName}</p></div>`
    }
}