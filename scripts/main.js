//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currPlayer = {};
let currOpponent = {};
let roundCount = 0;

//-------------- Game Class --------------//



//-------------- Create Info Boxes --------------//

//-------------- DOM Manipulation --------------//

// Extract page elements
const titlePage = document.querySelector(".title-page");
const selectionPage = document.querySelector(".selection-page");
const playersTeamPage = document.querySelector(".players-team-page");

// Page 1 - submit button takes player input and displays on next page

const submitBtn = document.querySelector(".submit-pg1");
submitBtn.addEventListener("click", () => {
  let inputBox = document.querySelector("input");
  playerName = inputBox.value;
  const playerGreeting = document.querySelector(".player-greeting");
  playerGreeting.innerHTML = `Hi ${playerName}! Please select 3 Pokemon for your team.`;

  titlePage.style.display = "none";
  selectionPage.style.display = "block";
});

// Page 2 - adds selected pokemons into players array

const avatars = document.querySelectorAll(".pokemon-img");
const confirmButton = document.querySelector(".confirm-team-btn");

avatars.forEach((element) => {
  element.addEventListener("click", () => {
    if (!arrIsFull(playerArr)) {
      const selectedPokemon = element.getAttribute("value");
      playerArr.push(selectedPokemon);
      console.log(playerArr);
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

// Page 3 - generate pokemon in player's team

const showPlayerSelection = () => {
  console.log(playerArr);
  for (let selected in playerArr) {
    console.log(selected);
    // for (let element of starterPokemonArr) {
    //     if (selected == element.name) {
    //         console.log(element.image)
    //     }
    // }
  }
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

const generateHPBar = () => {};
