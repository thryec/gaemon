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
  attackOpponent(target, move) {}
  checkIsAlive(breed) {}

}

const newGame = new Game();
