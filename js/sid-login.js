var el = document.getElementById("login-btn")

function checkDetails() {
    var username = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;
    
    if((username!="johndoe")||(password!="abc123")){
        document.getElementById("error-message").style="color: red;";
        el.href="#";
        return false;
    }
    else{
        el.href="dashboard.html";
        return true;
    }
}

el.onclick = checkDetails;