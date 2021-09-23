//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "charmander";
let currentOpponent = "squirtle";
let roundCount = 0;
let playersTurn = true; // incorporate this

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
    console.log("play button clicked");
    //   announceCurrentPokemon();
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
        moveButton.classList.add("btn");
        playerOptions.append(moveButton);
      }
    }
  }
};

const renderBattlePokemon = (pokemon) => {
  const img = createImgWithName(pokemon);
  player1.appendChild(img);
  const healthBar = createHealthBar();
  healthBarColor = healthBar.firstChild;
  healthBarColor.classList.add(pokemon);
  player1.appendChild(healthBar);
};

const selectPlayerMove = () => {
  const attackOptions = document.querySelectorAll(".attack-options");
  for (let option of attackOptions) {
    option.addEventListener("click", (evt) => {
      handleClick(evt);
      playersTurn = false;
    });
  }
};

const handleClick = (evt) => {
  let selectedMove = evt.target.innerHTML;
  console.log(selectedMove);
  playerAttack(currentPlayer, currentOpponent, selectedMove);
};

// const playerPromise = new Promise((resolve, reject) => {
//   handleClick(evt);
//   resolve("move selected");
// });
// playerPromise.then((data) => console.log(data));

const commentaryBar = document.querySelector(".game-commentary");

const playerAttack = (sender, receiver, move) => {
  if (playersTurn) {
    const damageHP = getMoveHP(sender, move);
    let targetHP = getPokemonHP(receiver);
    percentDamage = Math.floor((damageHP / targetHP) * 100);
    pokemonDetailsObject[receiver].hp = targetHP - damageHP;
    reduceHP(receiver, percentDamage);
    showGameCommentary(sender, receiver, move);
  }
};

const oppAttack = (sender, receiver, move) => {
  if (playersTurn) {
    const damageHP = getMoveHP(sender, move);
    let targetHP = getPokemonHP(receiver);
    percentDamage = Math.floor((damageHP / targetHP) * 100);
    pokemonDetailsObject[receiver].hp = targetHP - damageHP;
    reduceHP(receiver, percentDamage);
  }
};

// while player and opponent are alive, run game round
const startRound = (player, opponent) => {
  commentaryBar.innerHTML = "Please select a move for your Pokemon: ";
  if (checkIfAlive(player) && checkIfAlive(opponent)) {
    // selectPlayerMove();
  }
};

const opponentAttacks = (player, opponent) => {
  playersTurn = true;
  console.log("start opponent attack");
  let opponentMove = selectRandomMove(opponent);
  console.log(opponentMove);
  oppAttack(opponent, player, opponentMove);
  console.log("end opponent attack");
};

const selectRandomMove = (opponent) => {
  let moves = pokemonDetailsObject[opponent].moves;
  let selectedMove = pickRandomKey(moves);
  return selectedMove;
};

// if dead, remove from active array

// check HP, annouce dead if dead
const checkIfAlive = (pokemon) => {
  if (pokemonDetailsObject[pokemon].hp <= 0) {
    pokemonDetailsObject[pokemon].isAlive = false;
    return false;
  } else {
    return true;
  }
};

//
window.addEventListener("load", () => {
  generateMoves(currentPlayer);
  renderBattlePokemon(currentPlayer);
  renderBattlePokemon(currentOpponent);
  selectPlayerMove();
  startRound(currentPlayer, currentOpponent);
  // opponentAttacks(currentPlayer, currentOpponent);
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
  return allPokemonDetails.filter((pokemon) => pokemon.name === name);
};

const getMoveHP = (pokemon, move) => {
  const detailsObject = getPokemonDetailsWithName(pokemon);
  const hp = detailsObject[0].moves[move];
  return hp;
};

const getPokemonHP = (pokemon) => {
  return pokemonDetailsObject[pokemon].hp;
};

const pickRandomKey = (obj) => {
  let keys = Object.keys(obj);
  let randInt = generateRandomInteger(0, keys.length);
  return keys[randInt];
};

const showGameCommentary = (sender, receiver, move) => {
  let [action, effect] = narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  setTimeout(() => {
    commentaryBar.innerHTML = effect;
  }, 1500);
  setTimeout(() => {
    opponentAttacks(currentPlayer, currentOpponent);
  }, 4000);
};

const narrateGame = (sender, receiver, move) => {
  const action = `${sender} used ${move}....`;
  const effect = `${receiver}'s HP is now ${pokemonDetailsObject[receiver].hp}`;
  return [action, effect];
};

const reduceHP = (receiver, percentDamage) => {
  // check if receiver is already dead 
  const healthStatus = document.getElementsByClassName(
    `health-bar ${receiver}`
  );
    const remainingHP = 100 - percentDamage;
    const stringHP = remainingHP.toString() + `%`;
    console.log(`${receiver}'s HP is ${stringHP}`)
    healthStatus[0].style.width = stringHP;
};
