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
      teamDisplay.innerHTML = "";
      startRound();
    });
  },
  handleSubmitButton: () => {
    let inputBox = document.querySelector("input");
    playerName = inputBox.value;
    const playerGreeting = document.querySelector(".player-greeting");
    playerGreeting.innerHTML = `Hi ${playerName}! Please select 3 Pokemon for your team.`;
    titlePage.style.display = "none";
    selectionPage.style.display = "block";
  },
  selectActiveCharacter: () => {
    const playersCharacters = document.querySelectorAll(".character-stats");
    for (let option of playersCharacters) {
      console.log(option);
      option.addEventListener("click", (evt) => {
        option.style.pointerEvents = "auto";
        currentPlayer = evt.target.getAttribute("value");
        test.announceCurrentPokemon();
      });
    }
  },
};
