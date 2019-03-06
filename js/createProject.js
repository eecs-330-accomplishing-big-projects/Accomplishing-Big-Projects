

function makeNewTab(){
	let tabs = document.getElementById("myTab")
	let tabPanes = document.getElementById("myTabContent")

	let tabName = document.getElementById("projectName").value
	let projectDeadline = document.getElementById("projectDeadline").value
	let tabHTML = "<li class=\"nav-item\">\n<a class=\"nav-link active\" id=\"home-tab\" data-toggle=\"tab\" href=\"#" + tabName + "\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">" + tabName + "</a>\n</li>"
	let tabPaneHTML = "<div class=\"tab-pane fade\" id=\"" + tabName + "\" role=\"tabpanel\">" + "hello, I rule!" + "</div>"


    let tab = document.createElement("li");
    tab.setAttribute("class", "nav-item");

    let link = document.createElement("a");
    link.setAttribute("class", "nav-link active");
    link.setAttribute("id", "tab" + tabName);
    link.setAttribute("data-toggle", "tab");
    link.setAttribute("href", "#" + tabName);
    link.setAttribute("role", "tab");
    link.setAttribute("aria-controls", "home");
    link.setAttribute("aria-selected", "true");

    link.innerHTML = tabName

    tab.appendChild(link)
    tabs.appendChild(tab)

    let tabPane = document.createElement("div")
    tabPane.setAttribute("class", "tab-pane fade")
    tabPane.setAttribute("id", "panel" + tabName)
    tabPane.setAttribute("role", "tabpanel")

    tabPane.innerHTML = projectDeadline

    tabPanes.appendChild(tabPane)

}

function createProject(){
	makeNewTab()
}