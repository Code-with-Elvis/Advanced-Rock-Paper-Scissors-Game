//+++Select Elements

let name = document.getElementById("name");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let confirmPass = document.getElementById("confirm-pass");
let validate = document.querySelector(".validate");
let form = document.querySelector("form");

/*
==============================
Players
==============================
*/
let players = JSON.parse(localStorage.getItem("RSP-Players")) || [
  {
    id: "#A445FEr",
    name: "Anonymous Doe",
    email: "anonymous@gmail.com",
    password: "@Anon2001",
    hasRated: false,
    scores: {
      wins: 0,
      ties: 0,
      loses: 0,
    },
  },
];

let loggedInUser = localStorage.getItem("player-id") || "";

/*
==============================
Fill the Inputs
==============================
*/
let activePlayer = players.find( p => p.id === loggedInUser);

name.value = activePlayer.name;
email.value = activePlayer.email;
pass.value = activePlayer.password;
confirmPass.value = activePlayer.password;

/*
==============================
Render Greetings
==============================
*/
let greetingElem = document.querySelector(".greetings");

function greetUser() {
  const date = new Date();
  const hour = date.getHours();

  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon!";
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening!";
  } else {
    greeting = "Hello!";
  }

  return greeting;
}


greetingElem.innerHTML = `${greetUser()}, <span>${activePlayer.name}</span>`
/*
==============================
Validation Message
==============================
*/

function message(sms, color) {
  validate.innerHTML = `${sms} <i class="bi bi-x"></i>`;
  // Remove existing color classes
  validate.classList.remove("error", "success");
  // Add new color class
  validate.classList.add(color, "active");

  let remover = document.querySelector(".bi-x");
  remover.onclick = () => {
    validate.classList.remove("active");
  };
}

/*
==============================
Validate Form
==============================
*/

//+++Validate Name
function validateName() {
  let userName = name.value.trim();
  if (userName === "") {
    message("Please fill in all required fields!", "error");
    return false;
  } else if (userName.split(" ").length < 2) {
    message("Please provide both first and last names!", "error");
    return false;
  }
  return true;
}

//+++Validate Email
function validateEmail() {
  let emailValue = email.value.trim();
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    message("Please fill in all required fields!", "error");
    return false;
  } else if (!emailValue.match(emailPattern)) {
    message("Please enter a valid email address!", "error");
    return false;
  }
  return true;
}

//+++Validate Password
function validateStrongPassword() {
  let passValue = pass.value.trim();
  // Define a single regex pattern for all criteria
  const strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;<>|./?]).{8,}$/;

  if (passValue === "") {
    message("Please fill in all required fields!", "error");
    return false;
  } else if (!passValue.match(strongPasswordPattern)) {
    message(
      "Please set a strong password: at least 8 characters with mixed characters!",
      "error"
    );
    return false;
  }
  return true;
}

//+++Confirm Password
function validateConfirmPass() {
  let confirmPassValue = confirmPass.value.trim();
  let passValue = pass.value.trim();

  if (confirmPassValue === "") {
    message("Please fill in all required fields!", "error");
    return false;
  } else if (confirmPassValue !== passValue) {
    message("Passwords do not match, please try again!", "error");
    return false;
  }
  return true;
}

/*
==============================
Check if Id is Demo Account
==============================
*/

function idCheck() {
  if (loggedInUser === "#A445FEr") {
    message("Sorry, You cannot modify demo account!", "error");
    return false;
  }
  return true;
}

/*
==============================
Make Player Changes In the Server
==============================
*/
function modifyPlayer() {
  let match = players.find((p) => p.id === loggedInUser);

  // Update match properties
  match.name = name.value;
  match.email = email.value;
  match.password = pass.value;

  localStorage.setItem("RSP-Players", JSON.stringify(players));
}

/*
==============================
Form Submission
==============================
*/
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    idCheck() &&
    validateName() &&
    validateEmail() &&
    validateStrongPassword() &&
    validateConfirmPass()
  ) {
    modifyPlayer()
    message("Profile modified successfully😎.", "success");
    setTimeout(()=> {
      location.reload();
    },1500)
  }
});




document.addEventListener("DOMContentLoaded", () => {
  let deleteBtn = document.querySelector(".delete-account");

  if (loggedInUser !== "#A445FEr") {
    deleteBtn.style.display = 'inline-block';
  } else {
    deleteBtn.style.display = 'none';
  }

  deleteBtn.addEventListener("click", function(){
    players = players.filter(p => p.id !== loggedInUser);
    loggedInUser = "";
    localStorage.setItem('player-id', loggedInUser);
    localStorage.setItem("RSP-Players", JSON.stringify(players));
    window.location.href = "./index.html";
  });
});




