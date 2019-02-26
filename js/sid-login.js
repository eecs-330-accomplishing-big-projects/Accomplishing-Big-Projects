var el = document.getElementById("login-btn")

function checkDetails() {
    
    
    var username = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;
    
    var user1 = username.concat(password);
    console.log(user1);
    
    var existing = window.localStorage.getItem('userlist');
        existing = existing ? existing.split(',') : [];
    console.log(existing);
    debugger;
    
    var flag = false;
    if(existing.length==0){
        console.log("I entered the if where existing.length = 0")
        debugger;
        document.getElementById("error-message").style="color: red;";
        el.href="#";
        return false;
    }
    else{
        console.log("I entered the else where existing existing earlier. Existing is: ")
        console.log(existing);
        debugger;
        var arrayLength = existing.length;
        for(var i = 0; i< arrayLength; i++){
            if(((existing[i].includes(user1))==true) && user1!=""){
                flag = true;
                break;
            }
        }
        
        if(flag==false){
            console.log("Flag is false.")
            debugger;
            document.getElementById("error-message").style="color: red;";
            el.href="#";
            return false;
        }
        else{
            console.log("Flag is true.")
            debugger;
            window.localStorage.setItem("CurrentUser",user1);
            el.href="dashboard.html";
            return true;   
        }
    }
}

el.onclick = checkDetails;