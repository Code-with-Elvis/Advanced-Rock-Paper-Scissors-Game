/*
===================================
Fetch Player Data
===================================
*/
//||Local Storage||
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
let loggedInUser = localStorage.getItem("player-id");


/*
===================================
Ratings In Action
===================================
*/

let ratingBox = document.querySelector('.rating')
let expressions = document.querySelectorAll('.expression span');

expressions.forEach((ex, index) => {
  ex.style.left = `${index * 100}%`;
});

let stars = document.querySelectorAll('.stars i');

let counter = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', function (e) {
    stars.forEach((s, index2) => {
      if (index >= index2) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    counter = parseInt(e.target.dataset.id, 10);
    expressions.forEach((ex) => {
      ex.style.transform = `translate(${-100 * counter}%)`;
    });
  });
});


/*
===================================
Form Handling
===================================
*/
//--Select Form Elements

let emailElem = document.querySelector("#email");
let nameElem = document.querySelector("#name");
let messageElem = document.querySelector("#message");



//======/``Set Input Values According to Active Player ``/==== 
let activePlayer = players.find(p => p.id === loggedInUser)
emailElem.value = activePlayer.email;
nameElem.value = activePlayer.name;


//======/``Validate Player ``/==== 
let alertMessage = document.querySelector(".alert-message")

function validetePlayer() {
  if(activePlayer.hasRated) {
    alertMessage.classList.add("active");
    alertMessage.querySelector("p").textContent = '⚠️This player has already rated the game'
    return false;
  } else {
    alertMessage.classList.add("active");
    alertMessage.querySelector("p").textContent = '⭐Rating was successful⭐'
    activePlayer.hasRated = true;
    localStorage.setItem("RSP-Players", JSON.stringify(players));
    return true;
  }
}

let removeBtn = document.querySelector(".alert-message span");

removeBtn.onclick = () => {
  alertMessage.classList.remove("active");
}

//======/``ratings validation ``/==== 
function validateRating() {
  if(counter === 0) {
    ratingBox.classList.add('error')
    return false;
  }

  ratingBox.classList.remove('error')
  return true;
}

//======/``name validation ``/====
function validateName() {
  let name = nameElem.value.trim();
  let nameError = document.querySelector(".name-error");
  const namesRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  
  if(name.length === 0) {
    nameElem.classList.add("error");
    nameError.classList.add("error");
    nameError.textContent = 'This field is required'
    return false;
  }
  else if(!namesRegex.test(name)) {
    nameElem.classList.add("error");
    nameError.classList.add("error");
    nameError.textContent = 'Invalid format. Please enter two names separated by a space.';
    return false;
  }
  else {
    nameElem.classList.remove("error");
    nameError.classList.remove("error");
    return true;
  }
}

//======/``email validation ``/====

function validateEmail() {
  let email = emailElem.value.trim();
  let emailError = document.querySelector(".email-error")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(email.length === 0) {
    emailElem.classList.add("error");
    emailError.classList.add("error");
    emailError.textContent = 'This field is required'
    return false;
  }
  else if (!emailRegex.test(email)) {
    emailElem.classList.add("error");
    emailError.classList.add("error");
    emailError.textContent = 'Invalid email address';
    return false
  } else {
    emailElem.classList.remove("error");
    emailError.classList.remove("error");
    return true;
  }
}


//======/``message validation ``/====

function validateMessage() {
  let message = messageElem.value.trim();
  let messageError = document.querySelector(".message-error")
  if(message.length === 0) {
    messageElem.classList.add("error");
    messageError.classList.add("error");
    messageError.textContent = 'This field is required'
    return false;
  }
  if(message.length < 100) {
    messageElem.classList.add("error");
    messageError.classList.add("error");
    messageError.textContent = 'Maximum number of text should be 100'
    return false;
  }
  else {
    messageElem.classList.remove("error");
    messageError.classList.remove("error");
    return true;
  }
}


/**===== Submiting Form ===== */

let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  const isRatingValid = validateRating();
  //const isValidPlayer = validetePlayer();

  // Display all errors if any
  if (!isNameValid || !isEmailValid || !isMessageValid || !isRatingValid) {
    return;
  }
  if(validetePlayer()) {
    // Generate Reviews
    generateReviews();
    // Clear inputs if all validations pass
    clearInputs();
  }
});


function clearInputs() {
  form.reset()
  counter = 0;
  stars.forEach(star => {
    star.classList.remove('active');
  });
  expressions.forEach((ex) => {
    ex.style.transform = `translate(${-100 * counter}%)`;
  });
}



/*
===================================
Update Ratings
===================================
*/

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function generateReviews() {
  let email = emailElem.value;
  let name = nameElem.value;
  let message = messageElem.value;

  let review = {
    id: `#${Date.now().toString(36).slice(2, 10)}`,
    stars: counter,
    name,
    message,
  }
  reviews.push(review);

  localStorage.setItem("reviews", JSON.stringify(reviews))
}



