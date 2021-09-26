// functions relating to actual gameplay
const game = {
  reduceHP: (sender, receiver, move) => {
    let targetHP = stats.getPokemonHP(receiver);
    const damageHP = stats.getMoveHP(sender, move);
    const healthStatus = document.getElementsByClassName(
      `health-bar ${receiver}`
    );
    pokemonDetailsObject[receiver].hp = targetHP - damageHP;
    if (pokemonDetailsObject[receiver].hp < 0) {
      healthStatus[0].style.width = "100%";
      healthStatus[0].style.backgroundColor = "red";
      commentaryBar.innerHTML = `${receiver} is dead`;
    } else {
      const remainingHP = ((targetHP - damageHP) / targetHP) * 100;
      currentPlayerHealth = remainingHP.toString() + `%`;
      healthStatus[0].style.width = currentPlayerHealth;
    }
  },
};

// functions for setting up the game
const setup = {
  populatePlayersArray: () => {
    avatars.forEach((element) => {
      element.addEventListener("click", () => {
        if (!admin.arrIsFull(playerArr)) {
          const selectedPokemon = element.getAttribute("value");
          playerArr.push(selectedPokemon);
          element.style.pointerEvents = "none";
          element.style.opacity = "0.5";
        }
        if (admin.arrIsFull(playerArr)) {
          confirmButton.style.pointerEvents = "auto";
        }
      });
    });
  },
  addRemainingToOpponent: () => {
    opponentArr = starterPokemonNames.filter(
      (element) => !playerArr.includes(element)
    );
  },
  selectRandomMove: (opponent) => {
    let moves = pokemonDetailsObject[opponent].moves;
    let selectedMove = admin.pickRandomKey(moves);
    return selectedMove;
  },
  selectRandomOpponent: () => {
    currentOpponent = "";
    const rand = admin.generateRandomInteger(0, 3);
    currentOpponent = opponentArr[rand];
  },
  generateMoves: (breed) => {
    for (let element of allPokemonDetails) {
      if (breed === element.name) {
        for (let move in element.moves) {
          const moveButton = render.createButton(move);
          moveButton.classList.add("attack-options");
          moveButton.classList.add("btn");
          playerOptions.append(moveButton);
        }
      }
    }
  },
  clearBattleArena: () => {
    roundCount++
    title.innerHTML = `Round ${roundCount}`;
    commentaryBar.innerHTML = "[Game Commentary]"
    playerOptions.innerHTML = ""
    player1.innerHTML = ""
    opponent1.innerHTML = ""
  },
  renderBattlePokemon: (pokemon, parentNode) => {
    parentNode.style.transition = ""
    parentNode.style.opacity = "100%"
    console.log(`rendering ${pokemon}`)
    const img = render.createImgWithName(pokemon);
    parentNode.appendChild(img);
    const healthBar = render.createHealthBar(pokemon);
    parentNode.appendChild(healthBar);
    console.log(parentNode)
    battleContainer.appendChild(parentNode)
  },
};
