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

    createTaskForm(tabPane)

    tabPanes.insertBefore(tabPane, tabPanes.children[tabPanes.childElementCount - 1])

    document.getElementById("projectName").value = ""
    document.getElementById("projectDeadline").value = ""

    let newProject = {title: name, tabName,deadline: projectDeadline, subtasks: []};
    userData.push(newProject);
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

function createTaskForm(tabPane){
	tabPane.innerHTML += "<br> <br>"

	let taskForm = document.createElement("div")
	let taskRow = document.createElement("div")
	let container = document.createElement("div")
	let actualForm = document.createElement("form")
	let addTaskButton = document.createElement("button")
	let icon = document.createElement("span")
	let iconPlaceholder = document.createElement("i")
	let icon2 = document.createElement("span")

	taskForm.setAttribute("class", "container-fluid")
	taskForm.setAttribute("id", "Subtasks")

	taskRow.setAttribute("class", "row")
	taskRow.setAttribute("id", "addSubtaskRow")

	container.setAttribute("class", "container-fluid")

	addTaskButton.setAttribute("type", "button")
	addTaskButton.setAttribute("class", "btn btn-primary btn-icon-split")
	addTaskButton.setAttribute("onclick", "addSubtask()")

	icon.setAttribute("class", "icon text-white-50")

	iconPlaceholder.setAttribute("class", "material-icons")
	iconPlaceholder.innerHTML = "+"

	icon2.setAttribute("class", "text")
	icon2.innerHTML = "Add New Task"

	icon.appendChild(iconPlaceholder)

	addTaskButton.appendChild(icon)
	addTaskButton.appendChild(icon2)

	container.appendChild(addTaskButton)

	taskRow.appendChild(container)

	taskForm.appendChild(taskRow)

	tabPane.appendChild(taskForm)

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
    if(project.length > 0)
    {
        project = project[0];
    }
    project.subtasks.map(displaySubtask)
}



function displaySubtask(subtask)
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks");
    let card = generateExistingCard(subtask);
    let addSubtaskRow = document.getElementById("addSubtaskRow");
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
    //subtaskCard.appendChild(body);

    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-6");
    wrapperCol.setAttribute("id","subtask-" + subTasks);

    wrapperCol.appendChild(subtaskCard);
    return wrapperCol;
}



function addSubtask()
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks");
    let subTask = generateNewCard();
    let addSubtaskRow = document.getElementById("addSubtaskRow");
    rows.removeChild(addSubtaskRow);
    newRow.className += "row";
    newRow.appendChild(subTask);

    rows.appendChild(newRow);
    rows.appendChild(addSubtaskRow);
    subTasks++;
}

function generateNewCard()
{

    let subtaskCard = createSubtaskCard();
    let header = createHeader(true);
    let body = createBody();
    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);

    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-6");
    wrapperCol.setAttribute("id","subtask-" + subTasks);

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
    addSubtaskToList(subtaskID,cardBody)
    let saveButton = cardBody.children[0].children[4];
    cardBody.children[0].removeChild(saveButton);
}
function deleteSubtask()
{
    // TODO
    if(confirm("Delete Subtask?"))
    {

    }
}
function addSubtaskToList(subtaskID, cardBody)
{
    let subtaskTitle = cardBody.firstChild.children[1];
    let estimatedTime = cardBody.firstChild.children[3];
    let subTaskObject = {id: subtaskID, title: subtaskTitle.value, time: estimatedTime.value};
    subtaskslist.push(subTaskObject);
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
    
    var el = document.getElementById("MyName");
    var localData = window.localStorage.getItem(UserName);
    let firstname = localData.firstName;
    el.innerHTML = firstname;
    if(localData)
    {
        userData = JSON.parse(localData);
    }
    else
    {
        userData = {userName: UserName, projects: []}
    }

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
    return userData.projects.filter(project => project.title === title);
}

init();