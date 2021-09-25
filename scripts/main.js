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
  buttons.handleSubmitButton();
  setup.populatePlayersArray();
  buttons.activateConfirmButton()
});

//-------------- Page 2 --------------//
// Generate more info modal (low priority)

//-------------- Page 3 --------------//

const showPlayerSelection = () => {
  for (let element of allPokemonDetails) {
    for (let selected of playerArr) {
      if (selected === element.name) {
        const displayWithStats = document.createElement("div");
        displayWithStats.classList.add("stats-box");
        teamDisplay.appendChild(displayWithStats);

        const img = render.createImgWithURL(element.img);
        img.classList.add("character-stats");
        img.setAttribute("value", element.name);
        displayWithStats.appendChild(img);

        render.addHealthBar(displayWithStats);
      }
    }
  }
  setup.randomlySelectOpponent();
  selectActiveCharacter();
};

// select candidate and assign to currentPlayer
const selectActiveCharacter = () => {
  const playersCharacters = document.querySelectorAll(".character-stats");
  for (let option of playersCharacters) {
    option.addEventListener("click", (evt) => {
      currentPlayer = evt.target.getAttribute("value");
      test.announceCurrentPokemon();
      buttons.activatePlayButton();
    });
  }
};

//-------------- Page 4 --------------//

const startRound = () => {
  setup.generateMoves(currentPlayer);
  setup.renderBattlePokemon(currentPlayer, player1);
  setup.renderBattlePokemon(currentOpponent, opponent1);
  selectPlayerMove();
};

const selectPlayerMove = () => {
  const attackOptions = document.querySelectorAll(".attack-options");
  for (let option of attackOptions) {
    option.addEventListener("click", (evt) => {
      handleMoveClick(evt);
    });
  }
};

const handleMoveClick = (evt) => {
  let selectedMove = evt.target.innerHTML;
  console.log(selectedMove);
  playerAttacks(currentPlayer, currentOpponent, selectedMove);
};

const playerAttacks = (sender, receiver, move) => {
  const damageHP = stats.getMoveHP(sender, move);
  reduceHP(receiver, damageHP);
  playerGameCommentary(sender, receiver, move);
};

const opponentAttacks = (player, opponent) => {
  let opponentMove = setup.selectRandomMove(opponent);
  console.log(`${opponent} used ${opponentMove}`);
  const damageHP = stats.getMoveHP(opponent, opponentMove);
  reduceHP(player, damageHP);
  opponentGameCommentary(opponent, player, opponentMove);
};

//-------------- Game Functions --------------//

const playerGameCommentary = async (sender, receiver, move) => {
  let [action, effect] = render.narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, 2000);
  });
  await timeout;
  if (stats.checkIfAlive(receiver)) {
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
  let [action, effect] = render.narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, 2000);
  });
  await timeout;
  if (stats.checkIfAlive(receiver)) {
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
  let targetHP = stats.getPokemonHP(receiver);
  pokemonDetailsObject[receiver].hp = targetHP - damageHP;
  const remainingHP = ((targetHP - damageHP) / targetHP) * 100;
  const stringHP = remainingHP.toString() + `%`;
  healthStatus[0].style.width = stringHP;
};
