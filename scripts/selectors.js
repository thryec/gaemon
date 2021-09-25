//-------------- Global Variables --------------//

let playerName = "";
let playerArr = [];
let opponentArr = [];
let currentPlayer = "";
let currentOpponent = "";
let roundCount = 0;
let playersTurn = true;

//-------------- Page/Container Elements --------------//

const titlePage = document.querySelector(".title-page");
const selectionPage = document.querySelector(".selection-page");
const playersTeamPage = document.querySelector(".players-team-page");
const teamDisplay = document.querySelector(".display-team");
const battlePage = document.querySelector(".battle-round-1");
const title = document.querySelector(".title-round-1");
const player1 = document.querySelector(".player1");
const opponent1 = document.querySelector(".opponent1");
const commentaryBar = document.querySelector(".game-commentary");

//-------------- Button/Image Elements --------------//

const submitBtn = document.querySelector(".submit-pg1");
const confirmButton = document.querySelector(".confirm-team-btn");
const avatars = document.querySelectorAll(".pokemon-img");
const playButton = document.querySelector(".play-button");
const playerOptions = document.querySelector(".player-moves");