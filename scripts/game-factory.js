// functions for rendering items on page
const render = {
  createImgWithName: (breed) => {
    for (let element of allPokemonDetails) {
      if (breed === element.name) {
        return createImgWithURL(element.img);
      }
    }
  },
};

// functions for getting pokemon stats
const stats = {};

// functions relating to actual gameplay
const game = {
  test: () => {
    console.log("game");
  },
};

// functions for setting up the game
const pregame = {};

// 1. refactor functions
// 2. handle dead pokemon
// 3. add type factor
