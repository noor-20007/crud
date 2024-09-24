// get varibles
const form = document.querySelector('form')
const projectList = document.querySelector('ul.collection')
const clearButton = document.querySelector('.clear-projects');
const filter = document.querySelector('#filter');
const projectInput = document.querySelector('#project');
// console.log(form , projectInput , projectList , clearProjects , filter)


loadEventListner()


function loadEventListner(){
    form.addEventListener('submit', addProject)

    projectList.addEventListener('click' , removeProject)

    clearButton.addEventListener('click', clearProjects)

    filter.addEventListener('keyup' , filterProject)

    document.addEventListener('DOMContentLoaded' , getProjects)

}

function getProjects(){
    let projects
    if(localStorage.getItem('projects') == null){
        projects = []
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }
   

    projects.forEach(function(ProjectName){
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(ProjectName))
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link)
        projectList.appendChild(li)
    })
}

function filterProject(e){
    const FilterText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(project){
        const itemText = project.firstChild.textContent;
        if(itemText.toLowerCase().indexOf(FilterText) != -1){
            project.style.display = 'block'
        }else{
             project.style.display = 'none'
        }
    })
}

function removeProject(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove()
        }
    }

    removeProjectsFromLocalStorage(e.target.parentElement.parentElement)
}


function removeProjectsFromLocalStorage(ProjectName){
    let projects
    if(localStorage.getItem('projects') == null){
        projects = []
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }

    projects.forEach(function(projectItem , index){
        if(projectItem.textContent = ProjectName){
           projects.splice(index , 1)

        }
        localStorage.setItem('projects' , JSON.stringify(projects))

    })
}

function clearProjects(e){
    // projectList.innerHTML = " "

    while(projectList.firstChild){
        projectList.removeChild(projectList.firstChild)
    }

    clearProjectsFromLocalStorage();
}

function clearProjectsFromLocalStorage(){
    localStorage.clear()
}

function addProject(e){

    if(projectInput.value === ''){
        alert("you must write something!!!")
    }
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(projectInput.value))
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link)
    projectList.appendChild(li)

   

    storeProjectInLocalStorage(projectInput.value)
     projectInput.value = " "
     e.preventDefault();
}

function storeProjectInLocalStorage(ProjectName){
    let projects
    if(localStorage.getItem('projects') == null){
        projects = []
    }else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    projects.push(ProjectName)
    localStorage.setItem('projects' , JSON.stringify(projects))

}