//-------------- Global Variables --------------// 

let playerName = ""
let starterPokemonArr = ['squirtle', 'bulbasaur', 'charmander', '']
let playerArr = []
let opponentArr = []
let currPlayer = {}
let currOpponent = {}
let roundCount = 0
const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';

//-------------- Pokemon Factory --------------// 

class Pokemon {
    constructor(name, type, hp, moves, isAlive, img) {
        this.name = name,
        this.type = type,
        this.hp = hp
        this.moves = moves,
        this.isAlive = isAlive,
        this.img = img
    }
}

const getPokemonDetails = async (name) => {
    const res = await fetch(pokemonApiUrl + "/" + name)
    const details = await res.json()
    const type = details.types[0].type.name
    const hp = details.stats[0].base_stat
    const attack = details.stats[1].base_stat
    const defense = details.stats[2].base_stat
    console.log(type, hp, attack, defense)
}

getPokemonDetails(starterPokemonArr[0])


// get info from API
// create 6 Pokemon objects and populate with data from API



//-------------- Event Listeners --------------// 

// Page 1

const titlePage = document.querySelector(".title-page")
const selectionPage = document.querySelector(".selection-page")

const submitBtn = document.querySelector('.submit-pg1')
submitBtn.addEventListener("click", () => {
    let inputBox = document.querySelector('input')
    inputBox.value = ""

    titlePage.style.display = "none"
    selectionPage.style.display = "block"
}) 


// Page 2 
