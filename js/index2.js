var users = [];
var repeated = false;
var name_sign_up = document.querySelector(".sign_up_form #name");
var email_sign_up = document.querySelector(".sign_up_form #email");
var pass_sign_up = document.querySelector(".sign_up_form #password");

document
  .querySelector(".sign_up_form  #sign_up_btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (JSON.parse(localStorage.getItem("users"))) {
      users = JSON.parse(localStorage.getItem("users"));
      for (var i = 0; i < users.length; i++) {
        if (users[i].email == email_sign_up.value) {
          repeated = true;
        }
      }
      if (repeated) {
        alert("repeated");
        clearForm();
      } else {
        createUser();
      }
    } else {
      createUser();
    }
  });

function createUser() {
  var user = {
    name: name_sign_up.value,
    email: email_sign_up.value,
    password: pass_sign_up.value,
  };
  users.push(user);
  saveUsers(users);
  clearForm();
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function clearForm() {
  name_sign_up.value = "";
  email_sign_up.value = "";
  pass_sign_up.value = "";
}
