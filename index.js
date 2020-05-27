window.onload = init;
function init() {
    const openModal = document.getElementById("open-modal-btn");
    const exitModal = document.getElementById("exit-modal");
    const createProjectBtn = document.getElementById("create-project-btn");
    const openNoProModal = document.getElementById("no-project-modal");
    const jumpingReminder = document.getElementById("no-proj-txt2-div");

    openModal.onclick = showModal;
    exitModal.onclick = hideModal;
    createProjectBtn.onclick = createProject;

    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    if(counter == 0){
        openNoProModal.style.display = "flex";
        openNoProModal.style.opacity = "0.5";
        jumpingReminder.style.display = "inline-block";
    }
    
    fetchProjects()
    prepareForRedirect();
}

/* Function that makes the "create procject" window pop up*/
function showModal() {
    const newProject = document.getElementById("new-project-modal");
    const counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    const openNoProModal = document.getElementById("no-project-modal");
    const jumpingReminder = document.getElementById("no-proj-txt2-div");

    if(counter < 6){
        newProject.style.visibility = "visible";
        newProject.style.opacity = 1;
        openNoProModal.style.display = "none";
        openNoProModal.style.opacity = "0";
        jumpingReminder.style.display = "none";

    }else{
        alert("Du har lagd max antall prosjekter");
    }
}

/* Function that makes the "create project" window shut down*/
function hideModal() {
    const newProject = document.getElementById("new-project-modal");
    const openNoProModal = document.getElementById("no-project-modal");
    const jumpingReminder = document.getElementById("no-proj-txt2-div");

    newProject.style.visibility = "hidden";
    newProject.style.opacity = 0;

    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    if(counter == 0){
        openNoProModal.style.display = "flex";
        openNoProModal.style.opacity = "0.5";
        jumpingReminder.style.display = "inline-block";
    }
}

function createProject() {
    var modalNameinput = document.getElementById("modal-name-input");
    var modalDateinput = document.getElementById("modal-date-input");
    var modalDateEndInput = document.getElementById('modal-date-end-input');
   
    var name = modalNameinput.value;
    var date = modalDateinput.value;
    var endDate = modalDateEndInput.value;
        
    var project = {
        name, date,endDate
    };


    if (project.name && project.date) {
        var projects = JSON.parse(window.localStorage.getItem("projects")) || [];
        var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
        const newProject = document.getElementById("new-project-modal");
        
        counter = parseInt(counter);
        counter++;
        window.localStorage.setItem("counter", JSON.stringify(counter));
        
        newProject.style.visibility = "hidden";
        newProject.style.opacity = 0;
        
        //Saves and push project to the projects array and saves it in localStorage
        projects.push(project);
        localStorage.setItem(`projects`, JSON.stringify(projects));

        fetchProjects();

        } else {
            alert("Fyll ut alle feltene");
        }
   
    modalNameinput.value = ""; 
    modalDateinput.value = "";
    modalDateEndInput.value = "";
}


function fetchProjects() {
    const projectContainer = document.getElementById("projects-container");
    projectContainer.innerHTML = "";

    var projects = JSON.parse(window.localStorage.getItem(`projects`)) || [];

    for (var i = 0; i < projects.length; i++) {
        var projectElement = document.createElement("div");

        projectElement.innerHTML = `
            <h1>${projects[i].name}</h1>
            <p>Start: ${projects[i].date}</p>
            <p>Slutt: ${projects[i].endDate}</p>
        `;

        projectElement.classList.add(`div${i}`);
        projectElement.classList.add(`div-common`);
        projectContainer.appendChild(projectElement);

        //Sets the projects box to one of the 6 predetermined colors
        var colorArray = ["#FF9AA2", "#FFAC81", "#FFDAC1", "#C7CEEA", "#FFB7B2", "#E2A7D9"];
        var color = colorArray[i];
        projectElement.style.backgroundColor = color;
    }
    prepareForRedirect();
}

function prepareForRedirect(){
    var dataForForwarding = {};
    var projectForForwarding = document.getElementsByClassName('div-common');
    
    //Using the let keyword lets the arrow function have access to the i variable through their
    //shared block scope
    for (let i = 0; i < projectForForwarding.length; i++) {
        //Creates a click event listener for each project
        projectForForwarding[i].addEventListener('click',() => {

            var specificProject = projectForForwarding[i];
            var projectName = specificProject.getElementsByTagName('h1')[0].innerHTML;
            var projectStartDate = specificProject.getElementsByTagName('p')[1].innerHTML;
            
            dataForForwarding = {projectName, projectStartDate};
            console.log(dataForForwarding);
            //Saving the clicked project in sessionStorage for use in the next page
            window.sessionStorage.setItem('projectForForwadring', JSON.stringify(dataForForwarding));
            //Redirecting to the new page by assigning the window.location's href.
            window.location.href = "../html/project-page.html";
        })
    }
}
