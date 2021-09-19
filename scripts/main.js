//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currPlayer = {};
let currOpponent = {};
let roundCount = 0;

//-------------- Game Class --------------//

//-------------- Create Info Boxes --------------//

//-------------- Page 1 --------------//

// Extract page elements
const titlePage = document.querySelector(".title-page");
const selectionPage = document.querySelector(".selection-page");
const playersTeamPage = document.querySelector(".players-team-page");

// Submit button takes player input and displays on next page

const submitBtn = document.querySelector(".submit-pg1");
submitBtn.addEventListener("click", () => {
  let inputBox = document.querySelector("input");
  playerName = inputBox.value;
  const playerGreeting = document.querySelector(".player-greeting");
  playerGreeting.innerHTML = `Hi ${playerName}! Please select 3 Pokemon for your team.`;

  titlePage.style.display = "none";
  selectionPage.style.display = "block";
});

//-------------- Page 2 --------------//
// Adds selected pokemons into players array

const avatars = document.querySelectorAll(".pokemon-img");
const confirmButton = document.querySelector(".confirm-team-btn");

avatars.forEach((element) => {
  element.addEventListener("click", () => {
    if (!arrIsFull(playerArr)) {
      const selectedPokemon = element.getAttribute("value");
      playerArr.push(selectedPokemon);
      element.style.pointerEvents = "none";
      element.style.opacity = "0.5";
    }
    if (arrIsFull(playerArr)) {
      confirmButton.style.pointerEvents = "auto";
    }
  });
});

confirmButton.addEventListener("click", () => {
  addRemainingToOpponent();
  selectionPage.style.display = "none";
  playersTeamPage.style.display = "block";
  showPlayerSelection();
});

//-------------- Page 3 --------------//
// Generate pokemon in player's team
const teamDisplay = document.querySelector(".display-team");

const showPlayerSelection = () => {
  for (let selected of playerArr) {
    for (let element of allPokemonDetails) {
      if (selected == element.name) {
        const displayWithStats = document.createElement("div");
        displayWithStats.classList.add('stats-box')
        teamDisplay.appendChild(displayWithStats);

        const img = createImgElement(element.img);
        displayWithStats.appendChild(img);
        addHealthBar(displayWithStats);
        
        const healthBar = document.querySelector(".health-bar");
        healthBar.innerHTML = element.hp;
      }
    }
  }
};

const addHealthBar = (parentDiv) => {
  const bar = createHealthBar();
  parentDiv.appendChild(bar);
};

//-------------- Helper Functions --------------//

const arrIsFull = (array) => {
  return array.length < 3 ? false : true;
};

const addRemainingToOpponent = () => {
  opponentArr = starterPokemonNames.filter(
    (element) => !playerArr.includes(element)
  );
};

const createImgElement = (urlPath) => {
  let img = document.createElement("img");
  img.src = urlPath;
  return img;
};

const createHealthBar = () => {
  const outerDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  outerDiv.classList.add("health-bar-container");
  innerDiv.classList.add("health-bar");
  outerDiv.append(innerDiv);
  return outerDiv;
};
