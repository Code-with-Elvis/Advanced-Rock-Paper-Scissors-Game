/*
================================
Finding The Player
================================
*/
//Select Elements
let playerElem = document.querySelector(".player");

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
      loses: 0,
    },
  },
];
let loggedInUser = localStorage.getItem("player-id");

/*
================================
Render Player Information
================================
*/

function renderPlayerInfo() {
  let match = players.find((p) => p.id === loggedInUser);

  // Calculate win percentage once
  let winPercentage = Math.round((match.scores.wins * 100) / 8);

  playerElem.innerHTML = `
    <h4 class="user--name">${match.name}</h4>
    <div class="my-scores">
      <div class="circle">
        <span>${match.scores.wins}/8</span>
      </div>
      <div class="percentage">
        <div class="progress"><div class="bar" style="width:${winPercentage}%"></div></div>
        <div class="percent">${winPercentage}%</div>
      </div>
    </div>
  `;
}

renderPlayerInfo();


/*
================================
Render Table Info
================================
*/
let tableBody = document.querySelector("table tbody");

function renderPlayers() {
  // Sorting the players in descending order based on win scores
  let newArr = players.sort((a, b) => b.scores.wins - a.scores.wins);

  tableBody.innerHTML = "";
   newArr.forEach((p) => {
    let {name,scores:{wins,loses,ties}} = p;

    tableBody.innerHTML += `
      <tr>
          <td><i class="bi bi-person"></i> <span>${name}</span></td>
          <td>${wins}/8</td>
          <td>${Math.round(
            (wins * 100) / 8
          )}%</td>
      </tr>
    `;
  });
}

renderPlayers();
