//-------------- Game Class --------------//

class Game {
  constructor(numOfRounds) {
    this.rounds = numOfRounds;
  }
  startGame() {
    createAllPokemon();
    roundCount = 0;
  }
  startRound(player, opponent) {
    roundCount++;
  }

  reduceHP(breed, move) {}
}

const newGame = new Game();
