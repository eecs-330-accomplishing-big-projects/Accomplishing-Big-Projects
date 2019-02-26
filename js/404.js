var el = document.getElementById("MyName");

function init(){
    
    var username = window.localStorage.getItem("CurrentUser");
    var firstname = window.localStorage.getItem(username);
    el.innerHTML = firstname;
}

init()