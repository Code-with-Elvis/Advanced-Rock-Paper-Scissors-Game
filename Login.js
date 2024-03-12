/*
==============================
Fetch Players
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


let playerEmail = document.getElementById("email")
let playerPass = document.getElementById("password");
let validate = document.querySelector(".validate");
let form = document.querySelector("form");
let preloader = document.querySelector(".preloader");
let eyeIcon = document.querySelector(".bi-eye-slash");
let demoBtn = document.querySelector(".demo-btn");


let loggedInUser = localStorage.getItem("player-id") || "";

/*
==============================
Demo Account
==============================
*/
demoBtn.addEventListener('click', function(){
  playerEmail.value = "anonymous@gmail.com";
  playerPass.value = "@Anon2001";
})

/*
==============================
Eye Toggle
==============================
*/
eyeIcon.addEventListener('click', function(){
    if(playerPass.type === "password") {
      playerPass.type = "text";
      eyeIcon.classList.replace("bi-eye-slash", "bi-eye")
    } else {
      playerPass.type = "password";
      eyeIcon.classList.replace("bi-eye","bi-eye-slash")
    }
})

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
======================================
Validate Player Credentials to submit
======================================
*/

function validateLogin() {
  let email = playerEmail.value;
  let password = playerPass.value;
  const user = players.find(player => player.email === email);
  if (!user) {
    message("Email not found", "error");
    return false;
  } else if (user.password !== password) {
    message("Incorrect password", "error");
    return false;
  } else {
    loggedInUser = user.id;
    localStorage.setItem('player-id', loggedInUser)
    return true;
  }
}

/*
======================================
Form Validation
======================================
*/
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(validateLogin()) {
    message("Login in process...", "success");
    form.reset();
    let p = setTimeout(()=> {
      preloader.classList.add("active")
    },1000)

    setTimeout(()=> {
      window.location.href = "./index.html";
      preloader.classList.remove("active");
      clearInterval(p);
    }, 6000);
  }
})