const delay = 250

//-------------- Page 1 --------------//

submitBtn.addEventListener("click", () => {
  buttons.handleSubmitButton();
  setup.populatePlayersArray();
  buttons.activateConfirmButton();
});

//-------------- Page 2 --------------//
// Generate more info modal (low priority)

//-------------- Page 3 - Selection Page --------------//
// select candidate and assign to currentPlayer

const showPlayerSelection = () => {
  for (let key of Object.keys(pokemonDetailsObject)) {
    for (let selected of playerArr) {
      if (selected === key) {
        const displayWithStats = document.createElement("div");
        displayWithStats.classList.add("stats-box");
        teamDisplay.appendChild(displayWithStats);
        const img = render.createImgWithURL(pokemonDetailsObject[key].img);
        img.classList.add("character-stats");
        img.setAttribute("value", key);
        displayWithStats.appendChild(img);
        render.addHealthBar(displayWithStats);
      }
    }
  }
  setup.selectRandomOpponent();
  buttons.selectActiveCharacter();
  buttons.activatePlayButton()
};

//-------------- Page 4 --------------//

title.innerHTML = `Round ${roundCount}`;

const startRound = () => {
  setup.generateMoves(currentPlayer);
  setup.renderBattlePokemon(currentPlayer, player1);
  test.announceCurrentPokemon()
  console.log(`rendering opponent pokemon`)
  setup.renderBattlePokemon(currentOpponent, opponent1);
  console.log(opponent1)
  console.log(`finished rendering opponent`)
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
  let [action, effect, winner] = render.narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, delay);
  });
  await timeout;
  if (stats.checkIfAlive(receiver)) {
    setTimeout(() => {
      opponentAttacks(currentOpponent, currentPlayer);
    }, delay);
  } else {
    const fadeout = new Promise((resolve) => {
      setTimeout(() => {
        render.removeFadeOut(opponent1, delay);
        resolve();
      }, delay);
    });
    await fadeout;
    commentaryBar.innerHTML = winner;
    const index = opponentArr.indexOf(receiver);
    opponentArr.splice(index, 1);
    console.log(`${opponentArr} are left in opponent's array`);
    pokemonDetailsObject[receiver].isAlive = false;
    setTimeout(() => {
      returnPlayersSelection();
    }, delay);
  }
};

const opponentGameCommentary = async (sender, receiver, move) => {
  let [action, effect, winner] = render.narrateGame(sender, receiver, move);
  commentaryBar.innerHTML = action;
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      commentaryBar.innerHTML = effect;
      resolve();
    }, delay);
  });
  await timeout;
  if (stats.checkIfAlive(receiver)) {
    setTimeout(() => {
      commentaryBar.innerHTML = "Please select your next move: ";
    }, delay);
  } else {
    const fadeout = new Promise((resolve) => {
      setTimeout(() => {
        render.removeFadeOut(player1, delay);
        resolve();
      }, delay);
    });
    await fadeout;
    commentaryBar.innerHTML = winner;
    const index = playerArr.indexOf(receiver);
    playerArr.splice(index, 1);
    console.log(`${playerArr} are left in player's array`);
    pokemonDetailsObject[receiver].isAlive = false;
    setTimeout(() => {
      returnPlayersSelection();
    }, delay);
  }
};

const returnPlayersSelection = () => {
  setup.clearBattleArena(); 
  setup.selectRandomOpponent();
  battlePage.style.display = "none";
  playersTeamPage.style.display = "block";
  for (let pokemon of playerArr) {
    const div = document.createElement('div')
    div.classList.add('stats-box')
    setup.renderBattlePokemon(pokemon, div)
    teamDisplay.appendChild(div)
  }
  if (stats.checkIfAlive(currentPlayer)) {
    stats.reflectPokemonHealth(currentPlayer)
  }
  buttons.selectActiveCharacter();
};
