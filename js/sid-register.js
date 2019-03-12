
var el = document.getElementById("Register");

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function fieldValidation(){

    var username = document.getElementById("InputUserName").value;
    var password = document.getElementById("InputPassword").value;
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("LastName").value;
    var email = document.getElementById("emailaddress").value;
    var email2 = document.getElementById("emailaddress2").value;
    var error = document.getElementById("fillallin");

    console.log(username);
    console.log(password);
    console.log(firstname);
    console.log(lastname);

    if((username=="")||(password=="")||(firstname=="")||(lastname=="")||(email=="")||(email2=="")){
        error.style = "color: red;";
        el.href = "#";
        return false;
    }

    if(email!=email2){
        error.innerHTML = "The two email addresses don't match! Try again.";
        document.getElementById("fillallin").style = "color: red;";
        el.href = "#";
        return false;
    }

    if(username.length<5){
        error.innerHTML = "The username needs to be at least 5 characters long! Try again.";
        document.getElementById("fillallin").style = "color: red;";
        el.href = "#";
        return false;
    }

    if(password.length<5){
        error.innerHTML = "The password needs to be at least 5 characters long! Try again.";
        document.getElementById("fillallin").style = "color: red;";
        el.href = "#";
        return false;
    }

    if(username === password){
        error.innerHTML = "The username and password cannot be the same.";
        document.getElementById("fillallin").style = "color: red;";
        el.href = "#";
        return false;
    }

    if (!validateEmail(email)) 
    {
        error.innerHTML = "The email address is not a valid email address! Try again.";
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
        let userData = {firstName: firstname, lastName: lastname, projects: []};
        window.localStorage.setItem(user1,JSON.stringify(userData));
        el.href = "index.html";
        return true;
    }
}

el.onclick = fieldValidation;