var el = document.getElementById("login-btn")

function checkDetails() {
    var username = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;
    
    var user1 = username.concat(password);
    console.log(user1);
    
    var existing = window.localStorage.getItem('userlist');
        existing = existing ? existing.split(',') : [];
    
    if(existing.length==0){
        document.getElementById("error-message").style="color: red;";
        el.href="#";
        return false;
    }
    else{
        var flag = false;
        {
            var arrayLength = existing.length;
            for(var i = 0; i< arrayLength; i++){
                if(existing[i].includes(user1)){
                    flag = true;
                    break;
                }
            }
        }
        
        if(flag==false){
            document.getElementById("error-message").style="color: red;";
            el.href="#";
            return false;
        }
        else{
            window.localStorage.setItem("CurrentUser",user1);
            el.href="dashboard.html";
            return true;   
        }
    }
}