let topSubtasks = [];
let subTasks = 0;
let savingTask = 0;

// TODO: delete empty rows


function addSubtask()
{
    let newRow = document.createElement("div");
    let rows = document.getElementById("Subtasks");
    let subTask = generateNewCard();

    newRow.className += "row";
    newRow.appendChild(subTask);

    rows.appendChild(newRow);
    subTasks++;
    alert(subTasks);
}

function generateNewCard()
{

    let subtaskCard = createSubtaskCard();
    let header = createHeader(true);
    let body = createBody();
    subtaskCard.appendChild(header);
    subtaskCard.appendChild(body);

    let wrapperCol = document.createElement("div");
    wrapperCol.setAttribute("class", "col-xl-3");
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
        header.innerHTML = "<h6 class='m-0 d-sm-inline-block font-weight-bold text-primary'>New Subtask</h6>";
        return header;
    }
    else
    {
        let header = document.createElement("div");
        header.setAttribute("class", "card-header py-3");
        header.innerHTML = "<h6 class='m-0 d-sm-inline-block font-weight-bold'>" + name + "</h6>";
        return header;
    }   
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
    form.innerHTML = "<h5>Subtask Name</h5>";
    form.innerHTML += "<input type='text' class='form-control' placeholder='Enter subtask name'>";
    form.innerHTML += "<h5>Estimated Time (hours)</h5>";
    form.innerHTML += "<input type='number' class='form-control' placeholder='Enter a time in hours'>";
    form.innerHTML += "<button type='button' class='btn btn-success mt-2 btn-icon-split' onclick='saveSubtask(this.parentElement.parentElement.parentElement.parentElement.id)'><span class='icon text-white-50'><i class='material-icons'>add</i></span><span class='text'>Save Subtask</span></button>";

    return form;
}

function saveSubtask(subtaskID)
{
    let frame = document.getElementById(subtaskID);
    let card = frame.children[0];
    let header = card.childNodes[0];
    let body = card.childNodes[1];

    card.removeChild(header);
    card.prepend(createHeader(false,subtaskID));
    
    let saveButton = body.children[0].childNodes[4];
    body.children[0].removeChild(saveButton);
    let headerText = header.childNodes[0];
    headerText.setAttribute("class","m-0 d-sm-inline-block font-weight-bold");

    
}

