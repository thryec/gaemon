//-------------- Page 1 --------------//

submitBtn.addEventListener("click", () => {
  buttons.handleSubmitButton();
  setup.populatePlayersArray();
  buttons.activateConfirmButton();
});

//-------------- Page 2 --------------//
// Generate more info modal (low priority)

//-------------- Page 3 --------------//
// select candidate and assign to currentPlayer

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
  buttons.selectActiveCharacter();
};

//-------------- Page 4 --------------//

title.innerHTML = `Round ${roundCount}`;

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
  game.reduceHP(sender, receiver, move);
  playerGameCommentary(sender, receiver, move);
};

const opponentAttacks = (sender, receiver) => {
  let opponentMove = setup.selectRandomMove(sender);
  game.reduceHP(sender, receiver, opponentMove);
  opponentGameCommentary(sender, receiver, opponentMove);
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
  // randomly generate next opponent from opponent's array
  if (stats.checkIfAlive(receiver)) {
    setTimeout(() => {
      opponentAttacks(currentOpponent, currentPlayer);
    }, 2000);
  } else {
    setTimeout(() => {
      render.removeFadeOut(opponent1, 3000);
    }, 1000);
    const index = opponentArr.indexOf(receiver);
    opponentArr.splice(index, 1);
    console.log(`${opponentArr} are left in opponent's array`);
    pokemonDetailsObject[receiver].isAlive = false;
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
  // render remaining pokemon in playerArr and prompt selection
  if (stats.checkIfAlive(receiver)) {
    setTimeout(() => {
      commentaryBar.innerHTML = "Please select your next move: ";
    }, 2000);
  } else {
    setTimeout(() => {
      render.removeFadeOut(player1, 3000);
    }, 1000);
    const index = playerArr.indexOf(receiver);
    playerArr.splice(index, 1);
    console.log(`${playerArr} are left in player's array`);
    pokemonDetailsObject[receiver].isAlive = false;
  }
};
