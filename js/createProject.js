let totalEstimatedTime = 0

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

    tabPanes.insertBefore(tabPane, tabPanes.children[tabPanes.childElementCount - 1])

    document.getElementById("projectName").value = ""
    document.getElementById("projectDeadline").value = ""
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

    document.getElementById("projectName").value = ""
    document.getElementById("projectDeadline").value = ""
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

function totalTime(){

	if (totalEstimatedTime < 0){
		return totalEstimatedTime + "hours"
	}
	else{
		return "No subtasks input yet"
	}
}
