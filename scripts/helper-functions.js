const getGlobalVariables = () => {
  console.log(
    `Player Name: ${playerName}, Player Array: ${playerArr}, Opponent's Array: ${opponentArr}, Player's Current Pokemon: ${currentPlayer}, Opponent's Current Player: ${currentOpponent}, Round Count: ${roundCount} `
  );
};

const arrIsFull = (array) => {
  return array.length < 3 ? false : true;
};

const addRemainingToOpponent = () => {
  opponentArr = starterPokemonNames.filter(
    (element) => !playerArr.includes(element)
  );
};

const createImgWithURL = (urlPath) => {
  let img = document.createElement("img");
  img.src = urlPath;
  return img;
};

const createImgWithName = (breed) => {
  for (let element of allPokemonDetails) {
    if (breed === element.name) {
      return createImgWithURL(element.img);
    }
  }
};

const addHealthBar = (parentDiv) => {
  const bar = createHealthBar();
  parentDiv.appendChild(bar);
};

const createHealthBar = () => {
  const outerDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  outerDiv.classList.add("health-bar-container");
  innerDiv.classList.add("health-bar");
  outerDiv.append(innerDiv);
  return outerDiv;
};

const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const announceCurrentPokemon = () => {
  if (currentPlayer != "") {
    console.log(
      `Player is using ${currentPlayer}, Opponent is using ${currentOpponent}`
    );
  }
};

const randomlySelectOpponent = () => {
  currentOpponent = "";
  const rand = generateRandomInteger(0, 3);
  currentOpponent = opponentArr[rand];
};

const createButton = (value) => {
  const btn = document.createElement("button");
  btn.innerHTML = value;
  return btn;
};

const getPokemonDetailsWithName = (name) => {
  return allPokemonDetails.filter((pokemon) => pokemon.name === name);
};

const getMoveHP = (pokemon, move) => {
  const detailsObject = getPokemonDetailsWithName(pokemon);
  const hp = detailsObject[0].moves[move];
  return hp;
};

const getPokemonHP = (pokemon) => {
  return pokemonDetailsObject[pokemon].hp;
};

const pickRandomKey = (obj) => {
  let keys = Object.keys(obj);
  let randInt = generateRandomInteger(0, keys.length);
  return keys[randInt];
};
