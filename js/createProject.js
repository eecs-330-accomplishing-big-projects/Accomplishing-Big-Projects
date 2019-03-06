

function createProject(){
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
	totalEstTime.innerHTML = "<br>  Total Estimated Time for Completion: " + totalTime() + " hours<br>"
	tabPane.appendChild(totalEstTime)


}

function totalTime(){
	return 69
}
