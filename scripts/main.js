//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currPlayer = {};
let currOpponent = {};
let roundCount = 0;
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon";

//-------------- Pokemon Variables --------------//
const starterPokemonNames = [
  "squirtle",
  "bulbasaur",
  "charmander",
  "mudkip",
  "treecko",
  "torchic",
];
const starterPokemonArr = [
  { name: "squirtle", image: "../img/squirtle.png", moves: { } },
  { name: "bulbasaur", image: "../img/bulbasaur.png" },
  { name: "charmander", image: "../img/charmander.png" },
  { name: "mudkip", image: "../img/mudkip.png" },
  { name: "treecko", image: "../img/treecko.png" },
  { name: "torchic", image: "../img/torchic.png" },
];

const allPokemonDetails = []

//-------------- Classes --------------//

class Pokemon {
  constructor(name, type, hp, isAlive, moves, img) {
    (this.name = name),
      (this.type = type),
      (this.hp = hp),
      (this.isAlive = isAlive || true);
    (this.moves = moves), 
    (this.img = img);
  }

  attack(target, move) {}

  announceHealth() {
    console.log(`${this.name}'s Health is ${this.hp}HP now.`);
  }
}

//-------------- Pokemon Factory --------------//

const getPokemonPromise = async (breed) => {
  const response = await fetch(pokemonApiUrl + "/" + breed);
  const details = await response.json();
  return details;
};

const extractPokemonDetails = async (breed) => {
  const obj = {};
  const data = await getPokemonPromise(breed);
  let moves = data.moves;
  let type = data.types[0].type.name;
  let hp = data.stats[0].base_stat;
  obj.name = breed;
  obj.type = type;
  obj.hp = hp;
  obj.moves = moves;
  return obj;
};

const createPokemon = async (breed) => {
  const data = await extractPokemonDetails(breed);
  let image; 
  for (let element of starterPokemonArr) {
      if(element.name === breed) {
          image = element.image
      }
  }
  const pokemon = new Pokemon(data.name, data.type, data.hp, true, data.moves, image);
  allPokemonDetails.push(pokemon)
};

// createPokemon("charmander");

const createAllPokemon = async () => {
  for (element of starterPokemonArr) {
    createPokemon(element.name);
  }
};

createAllPokemon()

console.log(allPokemonDetails)
//-------------- Create Info Boxes --------------//

//-------------- DOM Manipulation --------------//

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
});

// Page 3 - generate pokemon in player's team

for (let element of playerArr) {

}

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
