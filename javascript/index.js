
/* Getting elements from HTML */
var projectContainer = document.getElementById("projects-container");
var newProject = document.getElementById("new-project-modal");
var openModal = document.getElementById("open-modal-btn");
var exitModal = document.getElementById("exit-modal");
var modalNameinput = document.getElementById("modal-name-input");
var modalDateinput = document.getElementById("modal-date-input");
var modalDateEndInput = document.getElementById('modal-date-end-input');
var openNoProModal = document.getElementById("no-project-modal");

var createProjectBtn = document.getElementById("create-project-btn");





/* On clicks */
openModal.onclick = showModal;
exitModal.onclick = hideModal;
createProjectBtn.onclick = createProject;


/* Function that makes the "create procject" window pop up*/
function showModal() {

    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    if(counter < 6){
        newProject.style.visibility = "visible";
        newProject.style.opacity = 1;
        openNoProModal.style.display = "none";
        openNoProModal.style.opacity = "0";
    }else{
        alert("Du har lagd max antall prosjekter");
    }
        
    
    
}

/* Function that makes the "create project" window shut down*/
function hideModal() {
    newProject.style.visibility = "hidden";
    newProject.style.opacity = 0;
    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    if(counter == 0){
        openNoProModal.style.display = "flex";
        openNoProModal.style.opacity = "0.5";
    }
}




window.onload = init;
function init() {

    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
    if(counter == 0){
        openNoProModal.style.display = "flex";
        openNoProModal.style.opacity = "0.5";
    }


    fetchProjects()
    prepareForRedirect();
}

function createProject() {
   
   
     var name = modalNameinput.value;
     var date = modalDateinput.value;
     var endDate = modalDateEndInput.value;
        
     var project = {
         name, date,endDate
        };


        if (project.name && project.date) {

            var projects = JSON.parse(window.localStorage.getItem("projects")) || [];

            var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
        
            counter = parseInt(counter);
            counter++;
            window.localStorage.setItem("counter", JSON.stringify(counter));
        
            console.log(counter);
        
            
        
                newProject.style.visibility = "hidden";
                newProject.style.opacity = 0;
        
                /*Saves and publish local storage value*/
                

            projects.push(project);
            console.log(projects);
            localStorage.setItem(`projects`, JSON.stringify(projects));

            fetchProjects();

        }else{
            alert("Du må ha input");
        }
   
        modalNameinput.value = ""; 
        modalDateinput.value = "";
        modalDateEndInput.value = "";
}


function fetchProjects() {
    projectContainer.innerHTML = "";
    

    var projects = JSON.parse(window.localStorage.getItem(`projects`)) || [];

    for (var i = 0; i < projects.length; i++) {
        var projectElement = document.createElement("div");
        projectElement.innerHTML = 
        `<h1>${projects[i].name}</h1>
        <p>Start dato: ${projects[i].date}</p>
        <p>Slutt dato: ${projects[i].endDate}</p>`;

        projectElement.classList.add(`div${i}`);
        projectElement.classList.add(`div-common`);
        projectContainer.appendChild(projectElement);


        var colorArray = ["#FF9AA2", "#E2F0CB", "#FFDAC1", "#C7CEEA", "#FFB7B2", "#B5EAD7"];

        var color = colorArray[i];




        projectElement.style.backgroundColor = color;
    }
    prepareForRedirect();
}
function prepareForRedirect(){
    var dataForForwarding = {};
    var projectForForwarding = document.getElementsByClassName('div-common');
    
    console.log(projectForForwarding);
// Her bruker vi let-nøkkelordet for å gi rett scope tilgag til teller variabelen (i). (Block scope)

    for (let i = 0; i < projectForForwarding.length; i++) {
        projectForForwarding[i].addEventListener('click',() => {
            var specificProject = projectForForwarding[i];
            var projectName = specificProject.getElementsByTagName('p')[0].innerHTML;
            var projectStartDate = specificProject.getElementsByTagName('p')[1].innerHTML;
            
            dataForForwarding = {projectName, projectStartDate};
            console.log(dataForForwarding);

            window.sessionStorage.setItem('projectForForwadring', JSON.stringify(dataForForwarding));

            window.location.href = "project-page.html";
        })
    }
}
