// functions relating to actual gameplay
const game = {};

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
  randomlySelectOpponent: () => {
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
  renderBattlePokemon: (pokemon, parentNode) => {
    const img = render.createImgWithName(pokemon);
    parentNode.appendChild(img);
    const healthBar = render.createHealthBar();
    healthBarColor = healthBar.firstChild;
    healthBarColor.classList.add(pokemon);
    parentNode.appendChild(healthBar);
  },
};


// 2. handle dead pokemon
// 3. add type factor
