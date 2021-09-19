//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "";
let currentOpponent = "";
let roundCount = 0;

//-------------- Game Class --------------//

class Game {
  startGame() {}
  startRound() {
    roundCount++;
  }
}
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

// Generate more info modal (low priority)

//-------------- Page 3 --------------//
// Generate pokemon in player's team
const teamDisplay = document.querySelector(".display-team");
const playButton = document.querySelector(".play-button");

const showPlayerSelection = () => {
  for (let selected of playerArr) {
    for (let element of allPokemonDetails) {
      if (selected === element.name) {
        const displayWithStats = document.createElement("div");
        displayWithStats.classList.add("stats-box");
        teamDisplay.appendChild(displayWithStats);

        const img = createImgElement(element.img);
        img.classList.add("players-characters");
        img.setAttribute("value", selected);
        displayWithStats.appendChild(img);
        addHealthBar(displayWithStats);

        const healthBar = document.querySelector(".health-bar");
        healthBar.innerHTML = element.hp;
      }
    }
  }
  randomlySelectOpponent();
  selectActiveCharacter();
};

// select candidate and assign to currentPlayer
const selectActiveCharacter = () => {
  const playersCharacters = document.querySelectorAll(".players-characters");
  for (let option of playersCharacters) {
    option.addEventListener("click", (evt) => {
      currentPlayer = evt.target.getAttribute("value");
      console.log(currentPlayer);
      //   announceCurrentPokemon();
      //   activatePlayButton();
      playButton.addEventListener("click", (evt) => {
        announceCurrentPokemon();
        console.log(evt);
      });
    });
  }
};

// const activatePlayButton = () => {

//   };

//-------------- Page 4 --------------//

const title = document.querySelector(".title-round-1");
title.innerHTML = `Round ${roundCount}`;
// generate current player and current opponent

const showImgStats = (breed) => {
  for (let pokemon of allPokemonDetails) {
    if ((breed = pokemon.name)) {
      const img = createImgElement(pokemon.img);
      img.classList.add("players-characters");
      img.setAttribute("value", pokemon.name);
    }
  }
};
// generate current player moves

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

const addHealthBar = (parentDiv) => {
  const bar = createHealthBar();
  parentDiv.appendChild(bar);
};

const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const announceCurrentPokemon = () => {
  if (currentPlayer != "") {
    console.log(
      `Player is using ${currentPlayer}, Opponent is using ${currentOpponent}`
    );
  }
};

const randomlySelectOpponent = () => {
  currentOpponent = "";
  const rand = generateRandomInteger(0, 3);
  currentOpponent = opponentArr[rand];
};
