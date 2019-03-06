
var el = document.getElementById("MyName");

function displayProject(project)
{
    var v1 = " <div class=\"col-xl-3 col-md-6 mb-4\"><div class=\"card border-left-primary shadow h-100 py-2\"><div class=\"card-body\"><div class=\"row no-gutters align-items-center\"><div class=\"col mr-2\"><div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">";
        
    v1 = v1.concat(currprojectobject.title);
    v1 = v1.concat("</div><div class=\"h5 mb-0 font-weight-bold text-gray-800\">", currprojectobject.subtasks[currprojectobject.currenttask].title,"</div></div> </div></div></div></div>");
    innerHTMLstring = innerHTMLstring.concat(v1);
    document.getElementById("ActiveProjectRow").innerHTML += innerHTMLstring;
}


function init(){
    
    var username = window.localStorage.getItem("CurrentUser");
    var userData = JSON.parse(window.localStorage.getItem(username));
    let firstname = userData.firstName;
    el.innerHTML = firstname;
    
    var innerHTMLstring ="";
    var projects = userData.projects;
    projects.map(displayProject);

    
    if(innerHTMLstring!=""){
        
    }
    
}





function displayProject(index)
{

}

init()