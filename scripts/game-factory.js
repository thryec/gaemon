//-------------- Game Class --------------//

class Game {
    constructor(numOfRounds) {
        this.rounds = numOfRounds
    }
    startGame() {
        createAllPokemon() 
        roundCount = 0 
    }
    startRound() {
      roundCount++;
    }
    
  }

const game = new Game; 