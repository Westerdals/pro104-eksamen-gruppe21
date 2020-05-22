
/* Getting elements from HTML */
var projectContainer = document.getElementById("projects-container");
var newProject = document.getElementById("new-project-modal");
var openModal = document.getElementById("open-modal");
var exitModal = document.getElementById("exit-modal");
var input = document.getElementById("modal-input");

var createProjectBtn = document.getElementById("create-project-btn");





/* On clicks */
openModal.onclick = showModal;  
exitModal.onclick = hideModal;
createProjectBtn.onclick = createProject;

   
/* Function that makes the "create procject" window pop up*/
function showModal(){
    newProject.style.visibility = "visible";
    newProject.style.opacity = 1;
 }

/* Function that makes the "create project" window shut down*/
 function hideModal(){
    newProject.style.visibility = "hidden";
    newProject.style.opacity = 0;  
 }




window.onload = init;
function init(){
    

    fetchProjects()
}
 function createProject(){
 
     var counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
     

     
     
     counter = parseInt(counter);
     counter++;
     window.localStorage.setItem("counter",JSON.stringify(counter));
     
     console.log(counter);
     
     if(counter<7){
        
        newProject.style.visibility = "hidden";
        newProject.style.opacity = 0;
        
        /*Saves and publish local storage value*/
        var projectInput = {
            name: input.value,
            date: "2020-03-10"
        };
        if(projectInput){
            localStorage.setItem(`project${window.localStorage.length}`, JSON.stringify(projectInput));
            
            fetchProjects();
           
}
    }
    
     
    }
function fetchProjects(){
    projectContainer.innerHTML = "";
    for (var i = 1; i < window.localStorage.length; i++) {
    var projects = JSON.parse(window.localStorage.getItem(`project${i}`)); 
        
    var projectElement = document.createElement("div");
        projectElement.innerHTML = `${projects.name} <br> ${projects.date}`;
        projectElement.classList.add(`div${i}`);
        projectElement.classList.add(`div-common`);
        projectContainer.appendChild(projectElement);
        projectElement.style.backgroundColor="#333";
    
 
        
    
        
    
                  
            }
}
