let subtaskslist = [];
let userData = [];
let selectedProject;
let UserName;

let totalEstimatedTime = 0

let subTasks = 0;
let savingTask = 0;

function createSoloProject(){
	let tabs = document.getElementById("myTab")
	let tabPanes = document.getElementById("myTabContent")
	let projectName = document.getElementById("projectName")
	let projectDeadlineId = document.getElementById("projectDeadline")

	let tabName = projectName.value
	let projectDeadline = projectDeadlineId.value

	let newProject = {title: tabName, deadline: projectDeadline, subtasks: []};

	userData.projects.push(newProject);
	localStorage[localStorage.CurrentUser] = JSON.stringify(userData);

	updateTabs();
}

function createCollabProject(){
	let tabs = document.getElementById("myTab")
	let tabPanes = document.getElementById("myTabContent")
	let projectName = document.getElementById("projectName")
	let projectDeadlineId = document.getElementById("projectDeadline")

	let tabName = projectName.value
	let projectDeadline = projectDeadlineId.value


    let tab = document.createElement("li");
    tab.setAttribute("class", "nav-item");

    let link = document.createElement("a");
    link.setAttribute("class", "nav-link");
    link.setAttribute("id", "tab" + tabName);
    link.setAttribute("data-toggle", "tab");
    link.setAttribute("href", "#panel" + tabName);
    link.setAttribute("role", "tab");
    link.setAttribute("aria-controls", "home");
    link.setAttribute("aria-selected", "false");

    link.innerHTML = tabName

    tab.appendChild(link)
    tabs.insertBefore(tab, tabs.children[tabs.childElementCount - 1])

    let tabPane = document.createElement("div")
    tabPane.setAttribute("class", "tab-pane fade")
    tabPane.setAttribute("id", "panel" + tabName)
    tabPane.setAttribute("role", "tabpanel")
    tabPane.setAttribute("aria-labelledby", tabName + "-tab")

    styleProjectHeaders(tabName, tabPane)

    tabPanes.insertBefore(tabPane, tabPanes.children[tabPanes.childElementCount - 1])

    includeCollabs(tabPane)

    createTaskForm(tabPane)

    document.getElementById("projectName").value = ""
    document.getElementById("projectDeadline").value = ""

    let newProject = {title: name, tabName,deadline: projectDeadline, subtasks: [], collaborators: []};
    userData.push(newProject);
}

function includeCollabs(tabPane){
	let collabForm = document.createElement("div")
	collabForm.setAttribute("class", "d-sm-flex align-items-center mb-3 mt-4")

	let actualForm = document.createElement("form")

	let formInput = document.createElement("input")
	formInput.setAttribute("type", "text")
	formInput.setAttribute("class", "form-control")
	formInput.setAttribute("placeholder", "Enter email address")
	formInput.setAttribute("id", "email-form")

	actualForm.appendChild(formInput)
	collabForm.appendChild(actualForm)

	collabForm.innerHTML += "&nbsp;&nbsp;"

	let collabButton = document.createElement("a")
	collabButton.setAttribute("href", "#")
	collabButton.setAttribute("class", "d-none d-sm-inline-block btn btn-primary shadow-sm")
	collabButton.setAttribute("onclick", "addCollab()")
	collabButton.innerHTML = "+ Add Email"

	collabForm.appendChild(collabButton)

	let sharedWith = document.createElement("div")
	sharedWith.setAttribute("id", "shared-with")
	sharedWith.innerHTML = "Shared with: "

	tabPane.appendChild(collabForm)
	tabPane.appendChild(sharedWith)
}

function styleProjectHeaders(name, tabPane){
	let title = document.createElement("h3")
	title.setAttribute("class", "mb-0 text-gray-800")
	title.innerHTML = " Project Name: " + name + "<br>"
	tabPane.appendChild(title)

	let deadLine = document.createElement("h6")
	deadLine.setAttribute("class", "mb-0 text-gray-800")
	deadLine.innerHTML = "<br>  Project Deadline: " + document.getElementById("projectDeadline").value + "<br>"
	tabPane.appendChild(deadLine)

	let totalEstTime = document.createElement("h6")
	totalEstTime.setAttribute("class", "mb-0 text-gray-800")
	totalEstTime.innerHTML = "<br>  Total Estimated Time for Completion: " + totalTime() + "<br>"
	tabPane.appendChild(totalEstTime)
}


function createTaskForm(tabName,tabPane){
	tabPane.innerHTML += "<br> <br>";

	let taskForm = document.createElement("div");
	let taskRow = document.createElement("div");
	let container = document.createElement("div");
	let actualForm = document.createElement("form");
	let addTaskButton = document.createElement("button");
	let icon = document.createElement("span");
	let iconPlaceholder = document.createElement("i");
	let icon2 = document.createElement("span");

	taskForm.setAttribute("class", "container-fluid");
	taskForm.setAttribute("id", "Subtasks-" + tabName);

	taskRow.setAttribute("class", "row");
	taskRow.setAttribute("id", "addSubtaskRow-" + tabName);

	container.setAttribute("class", "container-fluid");

	addTaskButton.setAttribute("type", "button");
    addTaskButton.setAttribute("class", "btn btn-primary btn-icon-split");
    addTaskButton.setAttribute("id",tabName + "-subtask");
	addTaskButton.setAttribute("onclick", "addSubtask(getProjectTabTitle(this))");

	icon.setAttribute("class", "icon text-white-50");

	iconPlaceholder.setAttribute("class", "material-icons");
	iconPlaceholder.innerHTML = "+";

	icon2.setAttribute("class", "text");
	icon2.innerHTML = "Add New Task";

	icon.appendChild(iconPlaceholder);

	addTaskButton.appendChild(icon);
	addTaskButton.appendChild(icon2);

	container.appendChild(addTaskButton);

	taskRow.appendChild(container);

	taskForm.appendChild(taskRow);

	tabPane.appendChild(taskForm);

}

function getProjectTabTitle(button)
{
    let buttonID = button.id;
    let lastIndex = buttonID.lastIndexOf("-subtask");
    let projectTitle = buttonID.substring(0,lastIndex);
    return projectTitle;
}

function getProjectTitleFromCardBody(cardBody)
{
    let containerID = cardBody.parentElement.parentElement.id;
    let lastIndex = containerID.lastIndexOf("project-")
    let projectTitle = containerID.substring(lastIndex,containerID.length).split("project-")[1];
    return projectTitle;
}

function totalTime(){

	if (totalEstimatedTime < 0){
		return totalEstimatedTime + "hours"
	}
	else{
		return "No tasks input yet"
	}
}



/////////////////////// subtasks





// TODO: delete empty rows



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

function displaySubtask(subtask,projectTitle)
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks-" + projectTitle);
    let card = generateExistingCard(subtask);
    let addSubtaskRow = document.getElementById("addSubtaskRow-" + projectTitle);
    rows.removeChild(addSubtaskRow);
    newRow.className += "row";
    newRow.appendChild(card);

    rows.appendChild(newRow);
    rows.appendChild(addSubtaskRow);
    subTasks++;
}

function generateExistingCard(subtask)
{

    let subtaskCard = createSubtaskCard();
    let header = createHeader(false,subtask.title);
    addDeleteButton(header);
    addEditButton(header);
    let body = createBody();

    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);
    DisableFields(body);
    populateFields(body,subtask);
    removeSaveSubtaskButton(body);
    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-6");
    wrapperCol.setAttribute("id","subtask-" + subTasks);

    wrapperCol.appendChild(subtaskCard);
    return wrapperCol;
}

function populateFields(cardBody,subtask)
{
    cardBody.firstChild.children[1].value = subtask.title;
    cardBody.firstChild.children[3].value = subtask.time;
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
    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);

    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-6");
    wrapperCol.setAttribute("id","subtask-" + subTasks + "project-" + project);

    wrapperCol.appendChild(subtaskCard);
    return wrapperCol;
}

function createSubtaskCard()
{
    let subtaskCard = document.createElement("div");
    subtaskCard.setAttribute("class","card shadow mb-2 mt-4");
    return subtaskCard;
}
function createHeader(editing, name = "New Subtask")
{
    if(editing)
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header py-3");
        header.innerHTML = "<h5 class=' align-middle m-1 d-sm-inline-block font-weight-bold text-primary'>New Subtask</h5>";
        addDeleteButton(header);
        return header;
    }
    else
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header align-middle py-3");
        header.innerHTML = "<h5 class='align-middle m-1 d-sm-inline-block font-weight-bold'>" + name + "</h5>";
        return header;
    }
}
function addDeleteButton(header)
{
    let deleteButton = createDeleteButton();
    header.appendChild(deleteButton);
}

function createBody()
{
    let body = document.createElement("div");
    body.setAttribute("class","card-body");
    body.appendChild(createSubtaskForm());
    return body;
}

function createSubtaskForm()
{
    let form = document.createElement("Form");

    let formText = `<h5>Subtask Name</h5>
                    <input type='text' class='form-control' placeholder='Enter subtask name'>
                    <h5>Estimated Time (hours)</h5>
                    <input type='number' class='form-control' placeholder='Enter a time in hours'>
                    <button type='button' class='btn btn-success mt-2 btn-icon-split' onclick='saveSubtask(getButtonCardID(this))'>
                        <span class='icon text-white-50'><i class='material-icons'>add</i></span>
                        <span class='text'>Save Subtask</span>
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

    DisableFields(cardBody);
    updateHeader(card);
    addSubtaskToList(cardBody)
    removeSaveSubtaskButton(cardBody);
    saveUserData();
}


function removeSaveSubtaskButton(cardBody)
{
    let saveButton = cardBody.children[0].children[4];
    cardBody.children[0].removeChild(saveButton);
}
function saveUserData()
{
    window.localStorage.setItem(UserName,JSON.stringify(userData));
}




function deleteSubtask()
{
    // TODO
    if(confirm("Delete Subtask?"))
    {

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



function updateHeader(card)
{
    let header = card.childNodes[0];
    let headerText = header.firstChild;
    let cardBody = card.childNodes[1];
    let subtaskTitle = cardBody.firstChild.children[1];

    headerText.innerHTML = subtaskTitle.value;
    addEditButton(header);
    headerText.setAttribute("class","m-0 d-sm-inline-block font-weight-bold");
}

function addEditButton(header)
{
    let editButton = createEditButton();
    header.appendChild(editButton);
}


function DisableFields(cardBody)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    subtaskTitle.setAttribute("disabled","true");
    let estimatedTime = cardBody.firstChild.children[3];
    estimatedTime.setAttribute("disabled","true");
}
function EnableFields()
{
    // TODO
}

function createEditButton()
{
    let editButton = document.createElement("button");
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    editButton.setAttribute("onclick","EnableFields()");
    editButton.setAttribute("class","float-right btn")
    return editButton;
}

function createDeleteButton()
{
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";
    deleteButton.setAttribute("onclick","deleteSubtask(getDeleteSubtaskCard(this))");
    deleteButton.setAttribute("class","float-right btn btn-outline-danger")
    return deleteButton;
}

function getDeleteSubtaskCard(button)
{
    return button.parentElement.parentElement.parentElement;
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

function decodeName(codedName)
{
    
}


function updateTabs()
{

		let tabs = document.getElementById("myTab")
		let tabPanes = document.getElementById("myTabContent")

// clear out the tablist this could definitely be done better
	var i;
		for (i = 0; i<userData.projects.length; i++){
			var tabName = userData.projects[i].title;
            let codedTabName = tabName.replace(" ","_");
			console.log(tabName);

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






init();
