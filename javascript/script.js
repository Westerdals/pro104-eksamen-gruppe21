
/* Getting elements from HTML */
var projectContainer = document.getElementById("projects-container");
var newProject = document.getElementById("new-project-modal");
var openModal = document.getElementById("open-modal");
var exitModal = document.getElementById("exit-modal");
var modalNameinput = document.getElementById("modal-name-input");
var modalDateinput = document.getElementById("modal-date-input");

var createProjectBtn = document.getElementById("create-project-btn");





/* On clicks */
openModal.onclick = showModal;
exitModal.onclick = hideModal;
createProjectBtn.onclick = createProject;


/* Function that makes the "create procject" window pop up*/
function showModal() {
    newProject.style.visibility = "visible";
    newProject.style.opacity = 1;
}

/* Function that makes the "create project" window shut down*/
function hideModal() {
    newProject.style.visibility = "hidden";
    newProject.style.opacity = 0;
}




window.onload = init;
function init() {


    fetchProjects()
}
function createProject() {

    var projects = JSON.parse(window.localStorage.getItem("projects")) || [];

    var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;




    counter = parseInt(counter);
    counter++;
    window.localStorage.setItem("counter", JSON.stringify(counter));

    console.log(counter);

    if (counter < 7) {

        newProject.style.visibility = "hidden";
        newProject.style.opacity = 0;

        /*Saves and publish local storage value*/
        var name = modalNameinput.value;
        var date = modalDateinput.value;

        var project = {
            name, date
        }

        if (project) {
            projects.push(project);
            console.log(projects);
            localStorage.setItem(`projects`, JSON.stringify(projects));

            fetchProjects();

        }
    }


}



function fetchProjects() {
    projectContainer.innerHTML = "";
    

    var projects = JSON.parse(window.localStorage.getItem(`projects`)) || [];

    for (var i = 0; i < projects.length; i++) {
        var projectElement = document.createElement("div");
        projectElement.innerHTML = `<p>${projects[i].name} <br> ${projects[i].date}</p>`;
        projectElement.classList.add(`div${i}`);
        projectElement.classList.add(`div-common`);
        projectContainer.appendChild(projectElement);


        var colorArray = ["#333", "#444", "#343", "#121", "#111", "#345"];

        var color = colorArray[i];




        projectElement.style.backgroundColor = color;
    }












}
