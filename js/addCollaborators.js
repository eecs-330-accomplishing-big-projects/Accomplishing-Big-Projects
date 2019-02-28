let collaborators = [];

function addCollab(){

  let email = document.getElementById("email-form").value;
  document.getElementById("email-form").value = "";
  collaborators.push(email);
  document.getElementById("shared-with").innerHTML = "Shared With: " + collaborators;
}
