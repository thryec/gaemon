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
};

//-------------- Page 4 --------------//

title.innerHTML = `Round ${roundCount}`;

// window.addEventListener("load", () => {
//   startRound();
// });

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
  let [action, effect, winner] = render.narrateGame(sender, receiver, move);
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
      opponentAttacks(currentOpponent, currentPlayer);
    }, 2000);
  } else {
    const fadeout = new Promise((resolve) => {
      setTimeout(() => {
        render.removeFadeOut(opponent1, 3000);
        resolve();
      }, 2500);
    });
    await fadeout;
    commentaryBar.innerHTML = winner;
    const index = opponentArr.indexOf(receiver);
    opponentArr.splice(index, 1);
    console.log(`${opponentArr} are left in opponent's array`);
    pokemonDetailsObject[receiver].isAlive = false;
    setTimeout(() => {
      returnPlayersSelection();
    }, 3000);
  }
};

const opponentGameCommentary = async (sender, receiver, move) => {
  let [action, effect, winner] = render.narrateGame(sender, receiver, move);
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
    const fadeout = new Promise((resolve) => {
      setTimeout(() => {
        render.removeFadeOut(player1, 3000);
        resolve();
      }, 2500);
    });
    await fadeout;
    commentaryBar.innerHTML = winner;
    const index = playerArr.indexOf(receiver);
    playerArr.splice(index, 1);
    console.log(`${playerArr} are left in player's array`);
    pokemonDetailsObject[receiver].isAlive = false;
    setTimeout(() => {
      returnPlayersSelection();
    }, 3000);
  }
};

const returnPlayersSelection = () => {
  clearBattleArena(); 
  teamDisplay.innerHTML = "";
  battlePage.style.display = "none";
  playersTeamPage.style.display = "block";
  for (let pokemon of playerArr) {
    const div = document.createElement('div')
    div.classList.add('stats-box')
    setup.renderBattlePokemon(pokemon, div)
    teamDisplay.appendChild(div)
  }
  setup.selectRandomOpponent();
  buttons.selectActiveCharacter();
  if (stats.checkIfAlive(currentPlayer)) {
    const healthStatus = document.getElementsByClassName(
      `health-bar ${currentPlayer}`
    );
    healthStatus[0].style.width = currentPlayerHealth;
    console.log(`${currentPlayer}'s health is ${healthStatus[0].style.width}`);
  }
};


const clearBattleArena = () => {
  roundCount++
  title.innerHTML = `Round ${roundCount}`;
  commentaryBar.innerHTML = "[Game Commentary]"
  playerOptions.innerHTML = ""
  battleCharacter.innerHTML = ""
}