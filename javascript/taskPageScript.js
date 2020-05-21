function showParticipantModal(){
    document.getElementById('add-participant-modal').style.display = 'block';
}
function closeParticipantModal() {
    document.getElementById('add-participant-modal').style.display = "none";
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
 