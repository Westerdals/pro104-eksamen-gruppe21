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

    const participant = {firstName, lastName, email};
    console.log(participant);
    window.localStorage.setItem('user', JSON.stringify(participant));

    closeParticipantModal();
}

function renderParticipants(){
    participants = JSON.parse(window.localStorage.getItem('user')) || [];

    const memberList = document.getElementById("project-members");
    memberList.innerHTML += participants.firstName;

}
