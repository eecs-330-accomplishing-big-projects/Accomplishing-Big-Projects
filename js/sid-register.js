
var el = document.getElementById("Register");

function fieldValidation(){
    
    var username = document.getElementById("InputUserName").value;
    var password = document.getElementById("InputPassword").value;
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("LastName").value;
    
    console.log(username);
    console.log(password);
    console.log(firstname);
    console.log(lastname);
    if((username=="")||(password=="")||(firstname=="")||(lastname=="")){
        document.getElementById("fillallin").style = "color: red;";
        el.href = "#";
        return false;
    }
    else{
        
        var user1 = username.concat(password);
        var existing = window.localStorage.getItem('userlist');
        existing = existing ? existing.split(',') : [];
        existing.push(user1)
        window.localStorage.setItem('userlist',existing.toString());
        window.localStorage.setItem(user1,firstname);
        el.href = "index.html";
        return true;
    }
}

el.onclick = fieldValidation;