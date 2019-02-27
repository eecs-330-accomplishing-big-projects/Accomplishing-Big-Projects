let subtasks = [];
let subTasks = 0;
let savingTask = 0;

// TODO: delete empty rows


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
        header.innerHTML = "<h5 class='m-0 d-sm-inline-block font-weight-bold text-primary'>New Subtask</h5>";
        addDeleteButton(header);
        return header;
    }
    else
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header py-3");
        header.innerHTML = "<h5 class='m-0 d-sm-inline-block font-weight-bold'>" + name + "</h5>";
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
    let saveButton = cardBody.children[0].children[4];
    cardBody.children[0].removeChild(saveButton);
}
function deleteSubtask()
{
    // TODO
    var result = confirm("Delete Subtask?");
    if(result)
    {

    }
}
function addSubtaskToList()
{
    let subtaskTitle = cardBody.firstChild.children[1];
    let estimatedTime = cardBody.firstChild.children[3];
    let subTaskObject = {id: subtaskID, title: subtaskTitle.value, time: estimatedTime.value};
    subtasks.push(subTaskObject);
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
    deleteButton.setAttribute("onclick","deleteSubtask(deleteSubtask(getDeleteSubtaskCard(this)))");
    deleteButton.setAttribute("class","float-right btn btn-outline-danger")
    return deleteButton;
}

function getDeleteSubtaskCard(button)
{
    return button.parentElement.parentElement.parentElement;
}



var el = document.getElementById("MyName");

function init(){
    
    var username = window.localStorage.getItem("CurrentUser");
    var firstname = window.localStorage.getItem(username);
    el.innerHTML = firstname;
}

init()