//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "charmander";
let currentOpponent = "squirtle";
let roundCount = 0;

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
  showPlayerSelection();
  selectionPage.style.display = "none";
  playersTeamPage.style.display = "block";
});

// Generate more info modal (low priority)

//-------------- Page 3 --------------//
// Generate pokemon in player's team
const teamDisplay = document.querySelector(".display-team");
const playButton = document.querySelector(".play-button");

const showPlayerSelection = () => {
  for (let element of allPokemonDetails) {
    for (let selected of playerArr) {
      if (selected === element.name) {
        const displayWithStats = document.createElement("div");
        displayWithStats.classList.add("stats-box");
        teamDisplay.appendChild(displayWithStats);

        const img = createImgWithURL(element.img);
        img.classList.add("character-stats");
        img.setAttribute("value", element.name);
        displayWithStats.appendChild(img);

        addHealthBar(displayWithStats);
      }
    }
  }
  randomlySelectOpponent();
  selectActiveCharacter();
};

// select candidate and assign to currentPlayer
const selectActiveCharacter = () => {
  const playersCharacters = document.querySelectorAll(".character-stats");
  for (let option of playersCharacters) {
    option.addEventListener("click", (evt) => {
      currentPlayer = evt.target.getAttribute("value");
      console.log(currentPlayer);
      activatePlayButton();
    });
  }
};

const activatePlayButton = () => {
  playButton.pointerEvents = "auto";
  playButton.addEventListener("click", () => {
    //   announceCurrentPokemon();
    console.log("play button clicked");
  });
};

//-------------- Page 4 --------------//

const title = document.querySelector(".title-round-1");
const playerOptions = document.querySelector(".player-moves");
const player1 = document.querySelector(".player1");
const opponent1 = document.querySelector(".opponent1");

title.innerHTML = `Round ${roundCount}`;

const generateMoves = (breed) => {
  for (let element of allPokemonDetails) {
    if (breed === element.name) {
      for (let move in element.moves) {
        const moveButton = createButton(move);
        moveButton.classList.add("attack-options");
        playerOptions.append(moveButton);
      }
    }
  }
};

const renderBattlePokemon = (currentPlayer) => {
  const img = createImgWithName(currentPlayer);
  player1.appendChild(img);
  addHealthBar(player1);
};

// event listener on moves buttons -> decrement opponents HP accordingly
// randomly select opponent move -> decrement player's HP
// check HP - when someone is dead, announce winner

const selectPlayerMove = () => {
  const attackOptions = document.querySelectorAll(".attack-options");
  for (let option of attackOptions) {
    option.addEventListener('click', (evt) => {
        let selectedMove = evt.target.innerHTML
        console.log(selectedMove)
        attack(currentPlayer, currentOpponent, selectedMove)
    })
  }
};

const attack = (sender, receiver, move) => {
    const damageHP = getMoveHP(sender, move)
    let targetHP = getPokemonHP(receiver)
    pokemonDetailsObject[receiver].hp = targetHP - damageHP
    console.log(`${receiver}'s HP is now ${pokemonDetailsObject[receiver].hp}`)
    checkIsAlive(receiver)
}

const checkIsAlive = (pokemon) => {
    if (pokemonDetailsObject[pokemon].hp <= 0) {
        pokemonDetailsObject[pokemon].isAlive = false;
        console.log("dead")
    } else {
        console.log("still alive")
    }
}

window.addEventListener("load", () => {
  generateMoves(currentPlayer);
  renderBattlePokemon(currentPlayer);
  renderBattlePokemon(currentOpponent);
  selectPlayerMove();
});

//-------------- Helper Functions --------------//

const getGlobalVariables = () => {
  console.log(
    `Player Name: ${playerName}, Player Array: ${playerArr}, Opponent's Array: ${opponentArr}, Player's Current Pokemon: ${currentPlayer}, Opponent's Current Player: ${currentOpponent}, Round Count: ${roundCount} `
  );
};

const arrIsFull = (array) => {
  return array.length < 3 ? false : true;
};

const addRemainingToOpponent = () => {
  opponentArr = starterPokemonNames.filter(
    (element) => !playerArr.includes(element)
  );
};

const createImgWithURL = (urlPath) => {
  let img = document.createElement("img");
  img.src = urlPath;
  return img;
};

const createImgWithName = (breed) => {
  for (let element of allPokemonDetails) {
    if (breed === element.name) {
      return createImgWithURL(element.img);
    }
  }
};

const addHealthBar = (parentDiv) => {
  const bar = createHealthBar();
  parentDiv.appendChild(bar);
};

const createHealthBar = () => {
  const outerDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  outerDiv.classList.add("health-bar-container");
  innerDiv.classList.add("health-bar");
  outerDiv.append(innerDiv);
  return outerDiv;
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

const createButton = (value) => {
  const btn = document.createElement("button");
  btn.innerHTML = value;
  return btn;
};

const getPokemonDetailsWithName = (name) => {
    return allPokemonDetails.filter(pokemon => pokemon.name === name)
}

const getMoveHP = (pokemon, move) => {
    const detailsObject = getPokemonDetailsWithName(pokemon)
    const hp = detailsObject[0].moves[move]
    return hp 
}

const getPokemonHP = (pokemon) => {
    return pokemonDetailsObject[pokemon].hp
}