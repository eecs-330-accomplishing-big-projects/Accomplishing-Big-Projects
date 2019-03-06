let collaborators = [];

function addCollab(){

  let email = document.getElementById("email-form").value;
  document.getElementById("email-form").value = "";

  if (validateEmail(email)) 
  {
  	collaborators.push(" " + email);
  	document.getElementById("shared-with").innerHTML = "Shared With: " + collaborators + " ";
  }
  else
  {
  	window.alert("Please input a valid email.")
  }

}

//Found this code online to help with email validations
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
