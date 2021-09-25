//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "";
let currentOpponent = "";
let roundCount = 0;
let playersTurn = true;

//-------------- Page/Container Elements --------------//

const titlePage = document.querySelector(".title-page");
const selectionPage = document.querySelector(".selection-page");
const playersTeamPage = document.querySelector(".players-team-page");
const teamDisplay = document.querySelector(".display-team");
const battlePage = document.querySelector(".battle-round-1");
const title = document.querySelector(".title-round-1");
const player1 = document.querySelector(".player1");
const opponent1 = document.querySelector(".opponent1");
const commentaryBar = document.querySelector(".game-commentary");

//-------------- Button/Image Elements --------------//

const submitBtn = document.querySelector(".submit-pg1");
const confirmButton = document.querySelector(".confirm-team-btn");
const avatars = document.querySelectorAll(".pokemon-img");
const playButton = document.querySelector(".play-button");
const playerOptions = document.querySelector(".player-moves");

//-------------- Page 1 --------------//

submitBtn.addEventListener("click", () => {
  let inputBox = document.querySelector("input");
  playerName = inputBox.value;
  const playerGreeting = document.querySelector(".player-greeting");
  playerGreeting.innerHTML = `Hi ${playerName}! Please select 3 Pokemon for your team.`;

  titlePage.style.display = "none";
  selectionPage.style.display = "block";
  populatePlayersArray();
  activateConfirmButton()
});

//-------------- Page 2 --------------//
// Adds selected pokemons into players array

const populatePlayersArray = () => {
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
};

const activateConfirmButton = () => {
  confirmButton.addEventListener("click", () => {
    addRemainingToOpponent();
    showPlayerSelection();
    selectionPage.style.display = "none";
    playersTeamPage.style.display = "block";
  });
};

//-------------- Page 2.2 --------------//
// Generate more info modal (low priority)

//-------------- Page 3 --------------//

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
      announceCurrentPokemon();
      activatePlayButton();
    });
  }
};

const activatePlayButton = () => {
  playButton.style.pointerEvents = "auto";
  playButton.addEventListener("click", () => {
    playersTeamPage.style.display = "none";
    battlePage.style.display = "block";
  });
  startRound();
};

//-------------- Page 4 --------------//

// while player and opponent are alive, run game round
const startRound = () => {
  generateMoves(currentPlayer);
  renderBattlePokemon(currentPlayer, player1);
  renderBattlePokemon(currentOpponent, opponent1);
  selectPlayerMove();
};

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

const renderBattlePokemon = (pokemon, parentNode) => {
  const img = render.createImgWithName(pokemon);
  parentNode.appendChild(img);
  const healthBar = createHealthBar();
  healthBarColor = healthBar.firstChild;
  healthBarColor.classList.add(pokemon);
  parentNode.appendChild(healthBar);
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

const playerAttack = (sender, receiver, move) => {
  const damageHP = getMoveHP(sender, move);
  reduceHP(receiver, damageHP);
  playerGameCommentary(sender, receiver, move);
};

const opponentAttacks = (player, opponent) => {
  let opponentMove = selectRandomMove(opponent);
  console.log(`${opponent} used ${opponentMove}`);
  const damageHP = getMoveHP(opponent, opponentMove);
  reduceHP(player, damageHP);
  opponentGameCommentary(opponent, player, opponentMove);
};

// check HP, annouce dead if dead
const checkIfAlive = (pokemon) => {
  if (pokemonDetailsObject[pokemon].hp <= 0) {
    pokemonDetailsObject[pokemon].isAlive = false;
    return false;
  } else {
    return true;
  }
};

//-------------- Helper Functions --------------//

const playerGameCommentary = async (sender, receiver, move) => {
  let [action, effect] = narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, 2000);
  });
  await timeout;
  if (checkIfAlive(receiver)) {
    setTimeout(() => {
      opponentAttacks(currentPlayer, currentOpponent);
    }, 2000);
  } else {
    const index = opponentArr[receiver];
    opponentArr.splice(index, 1);
    console.log(opponentArr);
    pokemonDetailsObject[receiver].isAlive = false;
    console.log(pokemonDetailsObject[receiver].isAlive);
  }
};

const opponentGameCommentary = async (sender, receiver, move) => {
  let [action, effect] = narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, 2000);
  });
  await timeout;
  if (checkIfAlive(receiver)) {
    setTimeout(() => {
      commentaryBar.innerHTML = "Please select your next move: ";
    }, 2000);
  } else {
    const index = opponentArr[receiver];
    opponentArr.splice(index, 1);
    console.log(opponentArr);
    pokemonDetailsObject[receiver].isAlive = false;
    console.log(pokemonDetailsObject[receiver].isAlive);
  }
};

const reduceHP = (receiver, damageHP) => {
  const healthStatus = document.getElementsByClassName(
    `health-bar ${receiver}`
  );
  if (pokemonDetailsObject[receiver].hp < 0) {
    healthStatus[0].style.width = "100%";
    healthStatus[0].style.backgroundColor = "red";
    commentaryBar.innerHTML = `${receiver} is dead`;
  }
  let targetHP = getPokemonHP(receiver);
  pokemonDetailsObject[receiver].hp = targetHP - damageHP;
  const remainingHP = ((targetHP - damageHP) / targetHP) * 100;
  const stringHP = remainingHP.toString() + `%`;
  healthStatus[0].style.width = stringHP;
};
