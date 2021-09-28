// render: functions for rendering items on page
// admin: general javascript functions
// test: functions for testing functionality
// stats: functions for getting pokemon stats

const render = {
  createButton: (value) => {
    const btn = document.createElement("button");
    btn.innerHTML = value;
    return btn;
  },
  createImgWithName: (breed) => {
    for (let element of allPokemonDetails) {
      if (breed === element.name) {
        const img = render.createImgWithURL(element.img);
        img.classList.add("character-stats");
        img.setAttribute("value", breed);
        return img;
      }
    }
  },
  createImgWithURL: (urlPath) => {
    let img = document.createElement("img");
    img.src = urlPath;
    return img;
  },
  createHealthBar: (pokemon) => {
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    outerDiv.classList.add("health-bar-container");
    innerDiv.classList.add("health-bar");
    innerDiv.classList.add(pokemon);
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
    let winner = "";
    if (pokemonDetailsObject[receiver].hp > 0) {
      action = `${sender} used ${move}....`;
      effect = `${receiver}'s HP is now ${pokemonDetailsObject[receiver].hp}`;
    } else {
      action = `${sender} used ${move}....`;
      effect = `${receiver} is dead`;
      winner = `${sender} has won`;
    }
    return [action, effect, winner];
  },
  removeFadeOut: (el, speed) => {
    let seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";
    el.style.opacity = 0;
    setTimeout(() => {
      el.parentNode.removeChild(el);
    }, speed);
  },
};

const stats = {
  getPokemonDetailsWithName: (name) => {
    return allPokemonDetails.filter((pokemon) => pokemon.name === name);
  },
  getMoveHP: (sender, receiver, move) => {
    const detailsObject = stats.getPokemonDetailsWithName(sender);
    const rawHP = detailsObject[0].moves[move];
    const senderType = stats.getPokemonType(sender)
    const receiverType = stats.getPokemonType(receiver)
    const multiplier = matrix.getMultiplier(senderType, receiverType)
    console.log(rawHP, multiplier)
    return rawHP * multiplier;
  },
  getPokemonHP: (pokemon) => {
    return pokemonDetailsObject[pokemon].hp;
  },
  getPokemonType: (pokemon) => {
    return pokemonDetailsObject[pokemon].type;
  },
  checkIfAlive: (pokemon) => {
    if (pokemonDetailsObject[pokemon].hp <= 0) {
      pokemonDetailsObject[pokemon].isAlive = false;
      return false;
    } else {
      return true;
    }
  },
  getOriginalHP: (pokemon) => {
    for (let element of allPokemonDetails) {
      if (element.name === pokemon) {
        return element.hp;
      }
    }
  },
  reflectPokemonHealth: (pokemon) => {
    const healthStatus = document.getElementsByClassName(
      `health-bar ${pokemon}`
    );
    healthStatus[0].style.width = currentPlayerHealth;
  },
};

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

