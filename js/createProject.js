let subtaskslist = [];
let userData = [];
let selectedProject;
let UserName;

let totalEstimatedTime = 0

let subTasks = 0;
let savingTask = 0;

var el = document.getElementById("submitProject");

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function projectFieldValidation(){
    let user_data = userData.projects
    let tabs = document.getElementById("myTab")
    let tabPanes = document.getElementById("myTabContent")
    let projectName = document.getElementById("projectName").value
    let projectDeadlineId = document.getElementById("projectDeadline").value
    let error = document.getElementById("fillallin")
    let currentDate = new Date();
    let formattedCurrentDate = formatDate(currentDate)
    // let deadlineDate = new Date(projectDeadlineId)

    if ((projectName=="")||(projectDeadlineId=="")){
        alert("Project not saved! Please fill in all the fields when you try again.")
        el.removeAttribute("data-dismiss")
        el.href = "#";
        return false;
    }
    for(var i = 0; i < user_data.length; i++){
        let projectTitle = user_data[i].title;
        if(projectTitle == projectName){
            alert("Project not saved! Please input a project title different from one already used.")
            el.removeAttribute("data-dismiss")
            el.href = "#";
            return false;
        }
    }
    if(formattedCurrentDate > projectDeadlineId){
        alert("Project not saved! Please input a date in the future.")
        el.removeAttribute("data-dismiss")
        el.href = "#";
        return false;
    }
    else{
        el.setAttribute("data-dismiss", "modal")
        createSoloProject()
        return true;
    }

}


function createSoloProject(){

    let tabs = document.getElementById("myTab")
    let tabPanes = document.getElementById("myTabContent")
    let projectName = document.getElementById("projectName")
    let projectDeadlineId = document.getElementById("projectDeadline")

    let tabName = projectName.value;
    let projectDeadline = projectDeadlineId.value;
    let codedTabName = tabName.replace(" ","_");
    let newProject = {title: codedTabName, deadline: projectDeadline, subtasks: []};
    
    userData.projects.push(newProject);
    localStorage[localStorage.CurrentUser] = JSON.stringify(userData);
    
    updateTabs();

}

//Functions within CreateSoloProject

function updateTabs()
{

    let tabs = document.getElementById("myTab")
    let tabPanes = document.getElementById("myTabContent")

    // clear out the tablist this could definitely be done better
    for (var i = 0; i<userData.projects.length; i++){
        var tabName = userData.projects[i].title;
        let codedTabName = tabName.replace(" ","_");

        if (!document.getElementById("tab" + codedTabName)) {
            let tab = document.createElement("li");
            tab.setAttribute("class", "nav-item");

            let link = document.createElement("a");
            link.setAttribute("class", "nav-link");
            link.setAttribute("id", "tab" + codedTabName);
            link.setAttribute("data-toggle", "tab");
            link.setAttribute("href", "#panel" + codedTabName);
            link.setAttribute("role", "tab");
            link.setAttribute("aria-controls", "home");
            link.setAttribute("aria-selected", "false");

            link.innerHTML = codedTabName

            tab.appendChild(link)
            tabs.insertBefore(tab, tabs.children[tabs.childElementCount - 1])

            let tabPane = document.createElement("div")
            tabPane.setAttribute("class", "tab-pane fade")
            tabPane.setAttribute("id", "panel" + codedTabName)
            tabPane.setAttribute("role", "tabpanel")
            tabPane.setAttribute("aria-labelledby", codedTabName + "-tab")

            styleProjectHeaders(codedTabName, tabPane)
            createTaskForm(codedTabName, tabPane);
            tabPanes.insertBefore(tabPane, tabPanes.children[tabPanes.childElementCount - 1])
            displayProjectBody(codedTabName);

            document.getElementById("projectName").value = ""
            document.getElementById("projectDeadline").value = ""
        }

    }

}

//Functions within updateTabs

function styleProjectHeaders(name, tabPane){
    let title = document.createElement("h2")
    title.setAttribute("class", "mb-0 text-gray-800")
    title.innerHTML = " Project Name: " + name + "<br>"
    tabPane.appendChild(title)

    let deadLine = document.createElement("h6")
    deadLine.setAttribute("class", "mb-0 text-gray-800")
    deadLine.innerHTML = "<br>  Project Deadline: " + document.getElementById("projectDeadline").value + "<br>"
    tabPane.appendChild(deadLine)
}

function createTaskForm(tabName,tabPane){
    tabPane.innerHTML += "<br>";

    let taskForm = document.createElement("div");
    let taskRow = document.createElement("div");
    let container = document.createElement("div");
    let actualForm = document.createElement("form");
    let addTaskButton = document.createElement("button");
    let icon2 = document.createElement("span");

    taskForm.setAttribute("class", "container-fluid3");
    taskForm.setAttribute("id", "Subtasks-" + tabName);

    taskRow.setAttribute("class", "row");
    taskRow.setAttribute("id", "addSubtaskRow-" + tabName);

    container.setAttribute("class", "container-fluid3");

    addTaskButton.setAttribute("type", "button");
    addTaskButton.setAttribute("class", "btn btn-primary btn-icon-split");
    addTaskButton.setAttribute("id",tabName + "-subtask");
    addTaskButton.setAttribute("onclick", "addSubtask(getProjectTabTitle(this))");

    icon2.setAttribute("class", "text");
    icon2.innerHTML = "Add New Task";

    addTaskButton.appendChild(icon2);

    container.appendChild(addTaskButton);

    taskRow.appendChild(container);

    taskForm.appendChild(taskRow);

    tabPane.appendChild(taskForm);

}

function displayProjectBody(title)
{
    let project = findProjectByTitle(title);
    if(project)
    {
        project.subtasks.map(
            function(subtask) { return displaySubtask(subtask,title)}
        );

    }
}

//Functions within displayProjectBody

function displaySubtask(subtask,projectTitle)
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks-" + projectTitle);
    let card = generateExistingCard(subtask,projectTitle);
    let addSubtaskRow = document.getElementById("addSubtaskRow-" + projectTitle);
    rows.removeChild(addSubtaskRow);
    newRow.className += "row";
    newRow.appendChild(card);

    rows.appendChild(newRow);
    rows.appendChild(addSubtaskRow);
    subTasks++;
}

//Functions within displaySubtask

function generateExistingCard(subtask,project)
{

    let subtaskCard = createSubtaskCard();
    let header = createHeader(false,subtask);
    addCompletedButton(header,subtask)
    addDeleteButton(header);
    addEditButton(header);
    let body = createBody();

    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);
    DisableFields(body);
    populateFields(body,subtask);
    removeSaveSubtaskButton(body);
    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-13");
    wrapperCol.setAttribute("id","subtask-" + subTasks + "project-" + project);

    wrapperCol.appendChild(subtaskCard);
    return wrapperCol;
}

//Functions within generateExistingCard

function createSubtaskCard()
{
    let subtaskCard = document.createElement("div");
    subtaskCard.setAttribute("class","card shadow mb-2 mt-2");
    return subtaskCard;
}

function createHeader(editing, subtask=false)
{
    let name = "";
    let complete = false;
    if(!subtask)
    {
        name = "New Subtask";
    }
    else
    {
        name = subtask.flag ? subtask.title + " (Complete)" : subtask.title;
        complete = subtask.flag;
    }
    if(editing)
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header p-1 pl-3");

        header.innerHTML = "<h5 class=' align-middle mt-2 d-sm-inline-block font-weight-bold text-primary'>New Subtask</h5>";
        return header;
    }
    else
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header align-middle p-1 pl-3");
        if(complete)
        {
            header.innerHTML = "<h5 class='align-middle mt-2 d-sm-inline-block font-weight-bold text-success'>" + name + "</h5>";
        }
        else
        {
            header.innerHTML = "<h5 class='align-middle mt-2 d-sm-inline-block font-weight-bold'>" + name + "</h5>";
        }
        return header;
    }
}

function addCompletedButton(header,subtask={flag: false})
{
    let completedButton = createCompletedButton();
    if(subtask.flag)
    {
        completedButton.setAttribute("class","float-right btn btn-success h-100");
        header.firstChild.value = subtask.title + " (Complete)";
    }
    else
    {
        completedButton.setAttribute("class","float-right btn btn-outline-success");
        header.firstChild.value = subtask.title;
    }
    header.appendChild(completedButton);

}

//Functions within addCompletedButton

function createCompletedButton()
{
    let completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.setAttribute("onclick","toggleCompleteSubtask(this.parentElement.parentElement.children[1])");
    return completedButton;

}

//Functions within createCompletedButton

function toggleCompleteSubtask(cardBody)
{
    let card = cardBody.parentElement;
    let rowIndex = findCardIndexInList(card);
    let projectTitle = getProjectTitleFromCardBody(cardBody);
    let projectIndex = getProjectIndexByTitle(projectTitle);
    let subtask = userData.projects[projectIndex].subtasks[rowIndex];
    let completedButton = card.firstChild.children[1];
    let header = card.firstChild;
    if(subtask.flag)
    {
        completedButton.setAttribute("class","float-right btn btn-outline-success");
        header.firstChild.setAttribute("class","align-middle mt-2 d-sm-inline-block font-weight-bold");
        header.firstChild.textContent = subtask.title;

    }
    else
    {
        completedButton.setAttribute("class","float-right btn btn-success h-100");
        header.firstChild.textContent = subtask.title + " (Complete)";
        header.firstChild.setAttribute("class","align-middle mt-2 d-sm-inline-block font-weight-bold text-success");
    }
    userData.projects[projectIndex].subtasks[rowIndex].flag = !subtask.flag;
    saveUserData();
}

//Functions within toggleCompleteSubtask

function findCardIndexInList(card)
{
    let frame = card.parentElement;
    let frameRow = frame.parentElement;
    let rowIndex = -1;
    let subtaskContainer = frame.parentElement.parentElement;
    for(let i = 0; i < subtaskContainer.childNodes.length; i++)
    {
        if(subtaskContainer.childNodes[i] === frameRow)
        {
            rowIndex = i;
        }
    }
    return rowIndex;
}

function getProjectTitleFromCardBody(cardBody)
{
    let containerID = cardBody.parentElement.parentElement.id;
    let lastIndex = containerID.lastIndexOf("project-")
    let projectTitle = containerID.substring(lastIndex,containerID.length).split("project-")[1];
    return projectTitle;
}

function getProjectIndexByTitle(title)
{
    for(let i = 0; i < userData.projects.length; i++)
    {
        if(userData.projects[i].title === title)
        {
            return i;
        }
    }
    return false;
}

function saveUserData()
{
    window.localStorage.setItem(UserName,JSON.stringify(userData));
}

//Functions also within generateExistingCard

function addDeleteButton(header)
{
    let deleteButton = createDeleteButton();
    header.appendChild(deleteButton);

}

//Functions within addDeleteButton

function createDeleteButton()
{
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.setAttribute("onclick","deleteSubtask(getDeleteSubtaskCard(this))");
    deleteButton.setAttribute("class","float-right btn btn-outline-danger mh-100")
    return deleteButton;
}

//Fucntions within createDeleteButton


//Functions also within generateExistingCard

function addEditButton(header)
{
    let editButton = createEditButton();
    header.appendChild(editButton);
}

//Functions within addEditButton

function createEditButton()
{
    let editButton = document.createElement("button");
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    editButton.setAttribute("onclick","EnableFields(this.parentElement.parentElement.children[1])");
    editButton.setAttribute("class","float-right btn pb-0")
    return editButton;
}

//Functions also within generateExistingCard

function createBody()
{
    let body = document.createElement("div");
    body.setAttribute("class","card-body");
    body.appendChild(createSubtaskForm());
    return body;
}

function DisableFields(cardBody)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    subtaskTitle.setAttribute("disabled","true");
    let estimatedTime = cardBody.firstChild.children[3];
    estimatedTime.setAttribute("disabled","true");
}

function populateFields(cardBody,subtask)
{
    cardBody.firstChild.children[1].value = subtask.title;
    cardBody.firstChild.children[3].value = subtask.time;
}

function removeSaveSubtaskButton(cardBody)
{
    let saveButton = cardBody.children[0].children[4];
    cardBody.children[0].removeChild(saveButton);
}







function getProjectTabTitle(button)
{
    let buttonID = button.id;
    let lastIndex = buttonID.lastIndexOf("-subtask");
    let projectTitle = buttonID.substring(0,lastIndex);
    return projectTitle;
}




/////////////////////// subtasks





// TODO: delete empty rows



function dateValidation(date){
    var now = new Date();
    let valid = true;
    if (date < now) {
        valid = false;
        return valid;
    }
}



function addSubtask(project)
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks-" + project);
    let subTask = generateNewCard(project);
    let addSubtaskRow = document.getElementById("addSubtaskRow-" + project);
    rows.removeChild(addSubtaskRow);
    newRow.className += "row";
    newRow.appendChild(subTask);

    rows.appendChild(newRow);
    rows.appendChild(addSubtaskRow);
    subTasks++;
}

function generateNewCard(project)
{

    let subtaskCard = createSubtaskCard();
    let header = createHeader(true);
    let body = createBody();
    addCompletedButton(header);
    addDeleteButton(header);
    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);
    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-13");
    wrapperCol.setAttribute("id","subtask-" + subTasks + "project-" + project);

    wrapperCol.appendChild(subtaskCard);
    return wrapperCol;
}


function addDeleteButton(header)
{
    let deleteButton = createDeleteButton();
    header.appendChild(deleteButton);

}

function createSubtaskForm()
{
    let form = document.createElement("Form");

    let formText = `<h5>Subtask Name</h5>
                    <input type='text' class='form-control' placeholder='Enter task name'>
                    &nbsp;
                    <h5>Estimated Time (hours)</h5>
                    <input type='number' class='form-control' placeholder='Enter a time in hours'>
                    <button type='button' class='btn btn-success mt-2 btn-icon-split' onclick='saveSubtask(getButtonCardID(this))'>
                        <span class='text'>Save Task</span>
                    </button>`;
    formText.replace('\n','');
    form.innerHTML = formText;
    return form;
}

function getButtonCardID(button)
{
    return button.parentElement.parentElement.parentElement.parentElement.id;
}


function saveSubtask(subtaskID)
{
    let frame = document.getElementById(subtaskID);
    let card = frame.children[0];
    let cardBody = card.childNodes[1];
    let rowIndex = findCardIndexInList(card);
    DisableFields(cardBody);
    updateHeader(card);
    if(rowIndex > userData.projects[getProjectIndexByTitle(getProjectTitleFromCardBody(cardBody))].subtasks.length - 1)
    {
        addSubtaskToList(cardBody);
    }
    else
    {
        ModifySubtaskInList(cardBody,rowIndex);
    }



    removeSaveSubtaskButton(cardBody);
    saveUserData();
}

function addSaveSubtaskButton(cardBody)
{
    let saveButtonHTML =`<button type='button' class='btn btn-success mt-2 btn-icon-split' onclick='saveSubtask(getButtonCardID(this))'>
                            <span class='text'>Save Task</span>
                         </button>`
    let parentElement = document.createElement("div");
    parentElement.innerHTML = saveButtonHTML.trim();
    let buttonElement = parentElement.firstChild;
    cardBody.children[0].appendChild(buttonElement);
}



function deleteSubtask(card)
{
    // TODO
    if(confirm("Delete Subtask?"))
    {
        let subTaskIndex = findCardIndexInList(card);
        let cardBody = card.children[1];
        let projectIndex = getProjectIndexByTitle(getProjectTitleFromCardBody(cardBody));
        userData.projects[projectIndex].subtasks.splice(subTaskIndex,1);
        let frame = card.parentElement;
        let frameRow = frame.parentElement;
        let rowContainer = frameRow.parentElement;
        rowContainer.removeChild(frameRow);
        saveUserData();
        
    }
}
function addSubtaskToList(cardBody)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    let estimatedTime = cardBody.firstChild.children[3];
   
    let projectTitle = getProjectTitleFromCardBody(cardBody);
    let projectIndex = getProjectIndexByTitle(projectTitle);


    let subTaskObject = {title: subtaskTitle.value, time: estimatedTime.value, flag: false};
    userData.projects[projectIndex].subtasks.push(subTaskObject);
}

function ModifySubtaskInList(cardBody,index)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    let estimatedTime = cardBody.firstChild.children[3];
   
    let projectTitle = getProjectTitleFromCardBody(cardBody);
    let projectIndex = getProjectIndexByTitle(projectTitle);


    let subTaskObject = {title: subtaskTitle.value, time: estimatedTime.value, flag: false};
    userData.projects[projectIndex].subtasks[index] = subTaskObject;
}



function updateHeader(card)
{
    let header = card.childNodes[0];
    let headerText = header.firstChild;
    let cardBody = card.childNodes[1];
    let subtaskTitle = cardBody.firstChild.children[1];

    headerText.innerHTML = subtaskTitle.value;
    addEditButton(header);
    headerText.setAttribute("class","mt-2 d-sm-inline-block font-weight-bold");
}






function EnableFields(cardBody)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    subtaskTitle.removeAttribute("disabled");
    let estimatedTime = cardBody.firstChild.children[3];
    estimatedTime.removeAttribute("disabled");
    addSaveSubtaskButton(cardBody);
    removeEditButton(cardBody);
}

function removeEditButton(cardBody)
{
    let cardWrapper = cardBody.parentElement;
    let cardHeader = cardWrapper.firstChild;
    let editButton = cardHeader.children[3];
    cardHeader.removeChild(editButton);

}

function getDeleteSubtaskCard(button)
{
    return button.parentElement.parentElement;
}




function init(){

    UserName = window.localStorage.getItem("CurrentUser");

    var localData = window.localStorage.getItem(UserName);

    if(localData)
    {
        userData = JSON.parse(localData);
    }
    else
    {
        userData = {userName: UserName, projects: []}
    }

    var el = document.getElementById("MyName");
    el.innerHTML = userData.firstName;
    console.log(userData);
}

function saveProject(){

    debugger;

    var projectobject = Object();
    let title = document.getElementById("projectname").value;

    flag = false;
    console.log(findProjectByTitle(title));
    let stringkey = UserName;
    if(findProjectByTitle(title).length == 0){
        projectobject.title = document.getElementById("projectname").value;
        projectobject.subtasks = subtaskslist;

        if (dateValidation(document.getElementById("projectdeadline").value)){
            projectobject.deadline = document.getElementById("projectdeadline").value;
        }
        else{
            alert("Please enter a date that works")
            return
        }

        projectobject.deadline = document.getElementById("projectdeadline").value;
        userData.projects.push(projectobject);
        window.localStorage.setItem(stringkey,JSON.stringify(userData));
        alert("Project saved! Taking you to the project overview page.");
        window.location.href="projects.html";
        flag = true;
    }
    else
    {
        alert("Project with that title already exists -- not saving.");
    }





    console.log(projectobject);
    debugger;


    console.log(window.localStorage.getItem(stringkey));
    debugger;

    document.getElementById("saveprojectbtn").innerHTML="<i class=\"fas fa-download fa-sm text-white-50\"></i> Project Saved!";
}

function findProjectByTitle(title)
{
    console.log(userData.projects);
    let projectArray = userData.projects.filter(project => project.title === title)
    if(projectArray.length > 0)
    {
        return projectArray[0];
    }
    else
    {
        return false;
    }
}

function decodeName(codedName)
{
    
}






init();
