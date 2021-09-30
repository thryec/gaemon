//-------------- Pokemon Variables --------------//

const allPokemonDetails = [];
const pokemonDetailsObject = {};
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon";

const starterPokemonNames = [
  "squirtle",
  "bulbasaur",
  "charmander",
  "mudkip",
  "treecko",
  "torchic",
];

const starterPokemonArr = [
  {
    name: "squirtle",
    image: "img/squirtle.png",
    moves: { Headbutt: 12, Watergun: 12, Bite: 8, Confusion: 5 },
  },
  {
    name: "bulbasaur",
    image: "img/bulbasaur.png",
    moves: { Razerleaf: 11, Leechseed: 12, Growth: 8, Cut: 5 },
  },
  {
    name: "charmander",
    image: "img/charmander.png",
    moves: { Firepunch: 12, Scratch: 7, Bodyslam: 8, Megakick: 5 },
  },
  {
    name: "mudkip",
    image: "img/mudkip.png",
    moves: { Icebeam: 12, Headbutt: 7, Hydropump: 8, Stomp: 9 },
  },
  {
    name: "treecko",
    image: "img/treecko.png",
    moves: { Tackle: 12, RazorWind: 7, Cut: 8, Pound: 9 },
  },
  {
    name: "torchic",
    image: "img/torchic.png",
    moves: { Flamethrower: 12, Peck: 7, Scratch: 8, Sandattack: 9 },
  },
];

const matrix = {
  water: {
    water: 1,
    fire: 1.1,
    grass: 0.9
  },
  fire: {
    water: 0.9,
    fire: 1,
    grass: 1.1
  },
  grass: {
    water: 1.1,
    fire: 0.9,
    grass: 1
  },
  getMultiplier: (senderType, receiverType) => {
    const sender = matrix[senderType]
    const multiplier = sender[receiverType]
    return multiplier; 
  }
}

class Pokemon {
  constructor(name, type, hp, isAlive, moves, img) {
    (this.name = name),
      (this.type = type),
      (this.hp = hp),
      (this.isAlive = isAlive || true);
    (this.moves = moves), (this.img = img);
  }

  announceHealth() {
    console.log(`${this.name}'s Health is ${this.hp}HP now.`);
  }
}

//-------------- Pokemon Factory --------------//

const getPokemonPromise = async (breed) => {
  try {
    const response = await fetch(pokemonApiUrl + "/" + breed);
    const details = await response.json();
    return details;
  } catch (err) {
    console.log(err);
  }
};

const extractPokemonDetails = async (breed) => {
  const obj = {};
  const data = await getPokemonPromise(breed);
  let type = data.types[0].type.name;
  let hp = data.stats[0].base_stat;
  obj.name = breed;
  obj.type = type;
  obj.hp = hp;
  return obj;
};

const createPokemon = async (breed) => {
  const data = await extractPokemonDetails(breed);
  let image;
  let moves;
  for (let element of starterPokemonArr) {
    if (element.name === breed) {
      image = element.image;
    }
  }
  for (let element of starterPokemonArr) {
    if (element.name === breed) {
      moves = element.moves;
    }
  }
  const pokemon = new Pokemon(
    data.name,
    data.type,
    data.hp,
    true,
    moves,
    image
  );
  allPokemonDetails.push(pokemon);
};

const createAllPokemon = () => {
  for (element of starterPokemonArr) {
    createPokemon(element.name);
  }
};

createAllPokemon();

const convertToObject = () => {
  for (let pokemon of allPokemonDetails) {
    let key = pokemon.name;
    pokemonDetailsObject[key] = pokemon;
  }
};

window.addEventListener("load", () => {
  convertToObject();
});

console.log(pokemonDetailsObject)

