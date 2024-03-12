/*
================================
Commmon Settings
================================
*/
//Elements
let body = document.body;
let userAvatar = document.querySelector(".successful-login .avatar");
let playerInfo = document.querySelector(".successful-login .info");
let musicBtn = document.querySelector(".game-music .btn");
let slideBtn = document.querySelector(".game-music .btn span");
let audioPlayer = document.querySelector(".audio");
let signOutBtn = document.getElementById("sign-out");



userAvatar.addEventListener("click", function(){
  playerInfo.classList.toggle('active');
  if (playerInfo.classList.contains("active")) {
    userAvatar.classList.add("active")
  } else {
    userAvatar.classList.remove("active")
  }
})

const audioFiles = [
  './images/audio2.mpeg',
  './images/audio1.mpeg',
  './images/audio3.mpeg'
];

//let musicBtn = document.querySelector(".game-music .btn");
//let audioPlayer = document.querySelector(".audio");
let currentIndex = 0;

// Play the current audio file
function playAudio(index) {
    audioPlayer.src = audioFiles[index];
    audioPlayer.play();
}

// Play the next audio file in the array
function playNext() {
    currentIndex = (currentIndex + 1) % audioFiles.length;
    playAudio(currentIndex);
}

// Event listener for when the current audio ends
audioPlayer.addEventListener('ended', function() {
    // Check if there are more audio files to play
    if (currentIndex < audioFiles.length - 1) {
        playNext();
    } else {
        // If at the end of the array, loop back to the beginning
        currentIndex = 0;
        playAudio(currentIndex);
    }
});

// Toggle play/pause on button click
musicBtn.addEventListener('click', function() {
    musicBtn.classList.toggle("active");
    if (musicBtn.classList.contains("active")) {
        if (!audioPlayer.paused) {
            audioPlayer.play();
        } else {
            playAudio(currentIndex);
        }
    } else {
        audioPlayer.pause();
    }
});

// Start playing the first audio file if the button is active
if (musicBtn.classList.contains("active")) {
    playAudio(currentIndex);
}



/*
================================
Render Page For Player
================================
*/
//Select Elements
let fillCont = document.querySelector(".successful-login");
let emptyCont = document.querySelector(".no-account");
let playerName = document.getElementById("player-name");

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

//============ Render Page ==============
function renderPage() {
  if (loggedInUser) {
    fillCont.classList.add("active");
    emptyCont.classList.remove("active");
    updateUserInfo(loggedInUser);
  } else {
    fillCont.classList.remove("active");
    emptyCont.classList.add("active");
  }
}
renderPage(loggedInUser);

signOutBtn.addEventListener("click", function(){
  loggedInUser = "";
  localStorage.setItem('player-id', loggedInUser);
  location.reload();
})


//============ Update User Info ==============

function updateUserInfo(id) {
  let player = players.find(p => p.id === id);
    playerName.innerHTML = `Player: ${printFirstWord(player.name)}`;
    userAvatar.innerHTML = `<span>${printFirstLetters(player.name)}</span>`;
}

//============ Print The First Name Only ==============
function printFirstWord(name) {
  const words = name.trim().split(' ');
  
  if (words.length > 0) {
    return(words[0]);
  } else {
    return("Loading...");
  }
}

//============ Print The First Letters of a Name ==============
function printFirstLetters(sentence) {
  const words = sentence.trim().split(' ');
  
  if (words.length >= 2) {
    const firstLetters = words[0][0] + words[1][0];
    return(firstLetters);
  } else if (words.length === 1) {
    return(words[0][0]);
  } else {
    return("Loading...");
  }
}


/*
================================
Setting Game Play
================================
*/

let mainContent = document.querySelector(".main-content");
let playBtn = document.querySelector(".intro button");
let submitBtn = document.querySelector(".submit-btn button")
let staticBtns = document.querySelectorAll(".default-bnts button");
let backBtn = document.querySelector(".back-btn");

playBtn.addEventListener('click', function(){
  mainContent.classList.add("active");

  let activePlayer = players.find(p => p.id === loggedInUser);
  activePlayer.scores = {
    ties: 0,
    wins: 0,
    loses: 0,
  }
  localStorage.setItem("RSP-Players", JSON.stringify(players));
})

backBtn.addEventListener('click', function(){
  mainContent.classList.remove("active");

  let activePlayer = players.find(p => p.id === loggedInUser);
  activePlayer.scores = {
    ties: 0,
    wins: 0,
    loses: 0,
  }
  localStorage.setItem("RSP-Players", JSON.stringify(players));
})

//States Variables
let isPlaying = false;
let readyToSubmit = false;
let firstSelection = "";
let secondSelection = ""



staticBtns.forEach(btn => {
  btn.addEventListener("click", function(e){
    let elem = e.currentTarget;
    staticBtns.forEach(button=> {
      button.classList.remove("active")
    })
    elem.classList.add("active");
    isPlaying = true;
    firstSelection = elem.dataset.name

  })
})


//============ Create Dynamic Shuffling buttons ==============

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to generate random buttons
function generateButtons() {
  const options = ["Rock", "Paper", "Scissors"];
  shuffleArray(options); // Shuffle the array randomly
  let dynamicBox = document.querySelector(".to-select-btns");
  dynamicBox.innerHTML = ""; // Clear previous buttons
  
  
  // Create and append buttons
  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.setAttribute("data-name", option);
    dynamicBox.appendChild(button);
  });

  dynamicBox.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(e){
      if(isPlaying) {
        let elem = e.currentTarget;
        dynamicBox.querySelectorAll("button").forEach(btn => {
          btn.classList.remove("active")
        })
        elem.classList.add("active");
        readyToSubmit = true;
        submitBtn.disabled = false;
        secondSelection = elem.dataset.name
      } else {
        dynamicBox.querySelectorAll("button").forEach(btn => {
          btn.classList.remove("active")
        })
        submitBtn.disabled = true;
        secondSelection = "";
      }
    });
  });

  submitBtn.addEventListener('click', function() {
    dynamicBox.querySelectorAll("button").forEach(btn=> {
      btn.classList.add('submit');
    })
  })
  
}

// Call the function to generate initial buttons
generateButtons();


//============ Reset Buttons ==============
function resetBtns() {
  staticBtns.forEach(button=> {
    button.classList.remove("active")
  })
  isPlaying = false;
  firstSelection = "";
  secondSelection = "";
  submitBtn.disabled = true;
}

submitBtn.onclick = () => {
  mainContent.style.pointerEvents = "none";
  setTimeout(()=> {
    generateButtons();
    resetBtns();
    mainContent.style.pointerEvents = "visible";
  },4000);
}


//============ Submitting Results ==============
let gameMessage = document.querySelector(".game-message");


submitBtn.addEventListener('click', function(){
  gameMessage.classList.add('active');

  setTimeout(()=> {
    gameMessage.classList.remove('active');
  }, 4000)
})

/*
================================
Actual Gaming
================================
*/
//============ Calculate Scores ==============

function calculateScores() {
  let activePlayer = players.find(p => p.id === loggedInUser);

  if(firstSelection === secondSelection) {
    activePlayer.scores.ties++;
    return 'You Tie🤝🤝';
  } else if (firstSelection == "Rock" && secondSelection == "Scissors" || firstSelection == "Scissors" && secondSelection == "Paper" || firstSelection == "Paper" && secondSelection == "Rock") {
    activePlayer.scores.wins++;
    return 'You Win🏆🏅';
  } else {
    activePlayer.scores.loses++;
    return 'You Loss😭😭';
  }
}

//============ Actual Gaming ==============
let gameNotification = document.querySelector(".alert-box");
let gameLength = 8;
let count = 0;

submitBtn.addEventListener('click', function(){
  count++;
  let gameResult = calculateScores(); // Update scores and get game result
  localStorage.setItem("RSP-Players", JSON.stringify(players));
  let playingUser = players.find(p => p.id === loggedInUser);

  if(count < gameLength) {
    gameMessage.innerHTML = `<p>${gameResult} You have ${gameLength - count} more games to play</p>`;
  } else if (count === gameLength) {
    gameMessage.innerHTML = `<p>${gameResult} This was your last game.</p>`;
    setTimeout(()=> {
      gameNotification.classList.add('active');
      gameNotification.querySelector("span").innerHTML = `You scored ${playingUser.scores.wins} / ${gameLength}`;
    }, 3000);
  }
});


/*
================================
Working With Game Notification
================================
*/
let yesBtn = document.querySelector('.alert-box .yes');
let noBtn = document.querySelector('.alert-box .no');


yesBtn.addEventListener('click', function(){
  count = 0;
  gameNotification.classList.remove('active');
  let activePlayer = players.find(p => p.id === loggedInUser);
  activePlayer.scores = {
    ties: 0,
    wins: 0,
    loses: 0,
  }
  localStorage.setItem("RSP-Players", JSON.stringify(players));
});
noBtn.addEventListener('click', function(){
  count = 0;
  gameNotification.classList.remove('active');
  mainContent.classList.remove('active')
});

