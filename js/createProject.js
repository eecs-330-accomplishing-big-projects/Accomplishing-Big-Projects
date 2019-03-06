function makeNewTab(){
	let tabs = document.getElementById("myTab")
	let tabPanels = document.getElementById("tab-content")

	let tabName = document.getElementById("projectName").value
	let projectDeadline = document.getElementById("projectDeadline").value
	let tabHTML = "<li class=\"nav-item\">\n<a class=\"nav-link active\" id=\"home-tab\" data-toggle=\"tab\" href=\"#" + tabName + "\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">" + tabName + "</a>\n</li>"
	let tabPaneHTML = "<div class=\"tab-pane fade\" id=\"" + tabName + "\" role=\"tabpanel\">" +"hello, I rule!" + "</div>"

	$('nav nav-tabs').add(tabHTML)
	$('tab-content').add(tabPaneHTML)

}

function createProject(){
	makeNewTab()
}