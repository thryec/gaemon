//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "charmander";
let currentOpponent = "squirtle";
let roundCount = 0;
let playersTurn = true; 

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
  const damageHP = getMoveHP(sender, move);
  reduceHP(receiver, damageHP);
  showGameCommentary(sender, receiver, move);
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
  console.log(`${opponent} used ${opponentMove}`);
  const damageHP = getMoveHP(opponent, opponentMove);
  reduceHP(player, damageHP);
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

const reduceHP = (receiver, damageHP) => {
  const healthStatus = document.getElementsByClassName(
    `health-bar ${receiver}`
  );
  let targetHP = getPokemonHP(receiver);
  console.log(`${receiver}'s hp is ${targetHP}`);
  pokemonDetailsObject[receiver].hp = targetHP - damageHP;
  const remainingHP = ((targetHP - damageHP) / targetHP) * 100;
  const stringHP = remainingHP.toString() + `%`;
  healthStatus[0].style.width = stringHP;

  if (pokemonDetailsObject[receiver].hp < 0) {
    healthStatus[0].style.width = "100%"
    healthStatus[0].style.backgroundColor = "red";
    commentaryBar.innerHTML = `${receiver} is dead`
  } 
};
