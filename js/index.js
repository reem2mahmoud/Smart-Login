var inputs = document.querySelectorAll("form input");
var sign_up_btn = document.querySelector(".sign_up_form #sign_up_btn");

var sign_in_btn = document.querySelector(".sign_in_form #sign_in_btn");
var small_errors = document.querySelectorAll("small");
var user_name = document.querySelector(".welcome_block  #user_name");
var logout_btn = document.querySelector(".collapse #logout_btn");

var valid_inputs = true;
var users = [];
var repeated = false;
var exist = false;
var empty_inputs = false;

// SIGN-IN
if (
  window.location.pathname.includes("/index.html") ||
  window.location.pathname.includes("/")
) {
  sign_in_btn.addEventListener("click", function (e) {
    e.preventDefault();
    users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        addError(i, "");
        empty_inputs = true;
      }
    }
    console.log(empty_inputs, "empty_inputs");
    if (!empty_inputs) {
      if (users) {
        for (var i = 0; i < users.length; i++) {
          if (
            users[i].email == inputs[0].value &&
            users[i].password == inputs[1].value
          ) {
            exist = true;
            localStorage.setItem("user", JSON.stringify(users[i]));
          }
        }
        if (exist) {
          swal(
            "Congratulation",
            `${inputs[0].value} successfully loggined`,
            "success"
          );

          window.location.replace("pages/welcome.html");
        } else {
          swal(
            "Email or Password not valid",
            "Please try again later",
            "error"
          );
        }
      } else {
        swal(
          "User not stored",
          "Please go sign up page and stored your record",
          "error"
        );
      }
    }
  });
}

// SIGN-UP
if (window.location.pathname.includes("/pages/sign_up.html")) {
  sign_up_btn.addEventListener("click", function (e) {
    e.preventDefault();
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        addError(i, "");
      } else {
        if (inputs[i].type == "email") {
          checkEmailValidation(inputs[i].value)
            ? deleteError(i)
            : addError(i, "Please enter valid email");
        } else if (inputs[i].type == "password") {
          checkPassValidation(inputs[i].value)
            ? deleteError(i)
            : addError(
                i,
                "Please enter valid password with (8-30 char) 1 upper, 1 lower , 1 num , 1 special char "
              );
        }
      }
    }
    if (valid_inputs) {
      var user = {
        name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value,
      };

      if (JSON.parse(localStorage.getItem("users"))) {
        users = JSON.parse(localStorage.getItem("users"));
        for (var i = 0; i < users.length; i++) {
          if (users[i].email == user.email) {
            repeated = true;
          }
        }
      }

      !repeated
        ? addInStorge(user)
        : addError(1, "this email already exist , choose another one");
    }
  });
}

//LOGOUT
if (window.location.pathname.includes("/pages/welcome.html")) {
  logout_btn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.replace("../index.html");
  });
}

//CREATE USER AND ADD IN STORAGE
function addInStorge(user) {
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  swal("Good job!", `${user.name} Record Saved Successfully!`, "success");
  window.location.replace("../index.html");
}

//EMAIL-VALIDATION
function checkEmailValidation(email) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(String(email));
}

//PASSWORD-VALIDATION
function checkPassValidation(pass) {
  var regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  return regex.test(String(pass));
}

//ADD-ERROR
function addError(i, message) {
  valid_inputs = false;
  inputs[i].classList.add("is-invalid");
  inputs[i].parentElement.classList.add("error");
  if (message) {
    small_errors[i].innerText = message;
  }
}

//DELETE-ERROR
function deleteError(i) {
  valid_inputs = true;
  repeated = false;
  empty_inputs = false;
  inputs[i].classList.remove("is-invalid");
  inputs[i].parentElement.classList.remove("error");
}

//USER-NAME IN WELCOME PAGE
if (window.location.pathname == "/pages/welcome.html") {
  if (user_name) {
    var user = JSON.parse(localStorage.getItem("user"));
    user_name.innerText = user.name;
  }
}
