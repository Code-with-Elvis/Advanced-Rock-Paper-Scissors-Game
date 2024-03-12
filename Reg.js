//+++Select Elements

let name = document.getElementById("name");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let confirmPass = document.getElementById("confirm-pass");
let validate = document.querySelector(".validate");
let form = document.querySelector("form")


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
      loses: 0
    }
  }
]


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
  validate.classList.add(color, 'active');


  let remover = document.querySelector(".bi-x");
  remover.onclick = () => {
    validate.classList.remove("active")
  }
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
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;<>|./?]).{8,}$/;

  if (passValue === "") {
    message("Please fill in all required fields!", "error");
    return false;
  } else if (!passValue.match(strongPasswordPattern)) {
    message("Please set a strong password: at least 8 characters with mixed characters!", "error");
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
Check if email exist in players data
==============================
*/

function emailCheck() {
  let enteredEmail = email.value;

  let emails = players.map(p => p.email);
  if (emails.includes(enteredEmail)) {
    message("Sorry, that email has already been used!", "error");
    return false;
  }
  return true;
}


/*
==============================
Generate Unique Ids
==============================
*/
function generateUniqueId() {
  // Generate a random string
  const randomString = Math.random().toString(36).substring(2, 8);
  
  // Get the current timestamp
  const timestamp = Date.now().toString(36);

  // Combine random string and timestamp to create unique ID
  const uniqueId = randomString + timestamp;
  
  return uniqueId;
}


/*
==============================
Add Player to database
==============================
*/
function addPlayer() {

  players.push({ 
    id: generateUniqueId(),
    name: name.value,
    email: email.value,
    password: pass.value,
    scores: {
      wins: 0,
      ties: 0,
      loses: 0
    }
  })

  localStorage.setItem("RSP-Players", JSON.stringify(players));
}

/*
==============================
Form Submission
==============================
*/
form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (validateName() && validateEmail() && validateStrongPassword() && validateConfirmPass() && emailCheck()) {
    addPlayer();
    form.reset();
    message("Registration was successful 😎. You can now login!", "success");
  }
});
