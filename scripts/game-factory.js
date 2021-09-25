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

// functions for getting pokemon stats
const stats = {
  getPokemonDetailsWithName: (name) => {
    return allPokemonDetails.filter((pokemon) => pokemon.name === name);
  },
  getMoveHP: (pokemon, move) => {
    const detailsObject = stats.getPokemonDetailsWithName(pokemon);
    const hp = detailsObject[0].moves[move];
    return hp;
  },
  getPokemonHP: (pokemon) => {
    return pokemonDetailsObject[pokemon].hp;
  },
  checkIfAlive: (pokemon) => {
    if (pokemonDetailsObject[pokemon].hp <= 0) {
      pokemonDetailsObject[pokemon].isAlive = false;
      return false;
    } else {
      return true;
    }
  },
};

// functions for triggering buttons

const buttons = {
  activateConfirmButton: () => {
    confirmButton.addEventListener("click", () => {
      setup.addRemainingToOpponent();
      showPlayerSelection();
      selectionPage.style.display = "none";
      playersTeamPage.style.display = "block";
    });
  },
  activatePlayButton: () => {
    playButton.style.pointerEvents = "auto";
    playButton.addEventListener("click", () => {
      playersTeamPage.style.display = "none";
      battlePage.style.display = "block";
    });
    startRound();
  },
  handleSubmitButton: () => {
    let inputBox = document.querySelector("input");
    playerName = inputBox.value;
    const playerGreeting = document.querySelector(".player-greeting");
    playerGreeting.innerHTML = `Hi ${playerName}! Please select 3 Pokemon for your team.`;
    titlePage.style.display = "none";
    selectionPage.style.display = "block";
  },
};

// functions for rendering items on page
const render = {
  createButton: (value) => {
    const btn = document.createElement("button");
    btn.innerHTML = value;
    return btn;
  },
  createImgWithName: (breed) => {
    for (let element of allPokemonDetails) {
      if (breed === element.name) {
        return render.createImgWithURL(element.img);
      }
    }
  },
  createImgWithURL: (urlPath) => {
    let img = document.createElement("img");
    img.src = urlPath;
    return img;
  },
  createHealthBar: () => {
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    outerDiv.classList.add("health-bar-container");
    innerDiv.classList.add("health-bar");
    outerDiv.append(innerDiv);
    return outerDiv;
  },
  addHealthBar: (parentDiv) => {
    const bar = render.createHealthBar();
    parentDiv.appendChild(bar);
  },
  narrateGame: (sender, receiver, move) => {
    let action = "";
    let effect = "";
    if (pokemonDetailsObject[receiver].hp > 0) {
      action = `${sender} used ${move}....`;
      effect = `${receiver}'s HP is now ${pokemonDetailsObject[receiver].hp}`;
    } else {
      action = `${sender} used ${move}....`;
      effect = `${receiver} is dead`;
    }
    return [action, effect];
  },
};

// general javascript functions
const admin = {
  generateRandomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  pickRandomKey: (obj) => {
    let keys = Object.keys(obj);
    let randInt = admin.generateRandomInteger(0, keys.length);
    return keys[randInt];
  },
  arrIsFull: (array) => {
    return array.length < 3 ? false : true;
  },
};

// functions for testing functionality
const test = {
  announceCurrentPokemon: () => {
    if (currentPlayer != "") {
      console.log(
        `Player is using ${currentPlayer}, Opponent is using ${currentOpponent}`
      );
    } else {
      console.log("player not specified");
    }
  },
};

// 2. handle dead pokemon
// 3. add type factor
