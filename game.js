(()=>{
  console.log('This is the game');

  let buttons = document.querySelectorAll(".button");
  let user = document.querySelector("#selections .user");
  let computer = document.querySelector("#selections .computer");
  let gameboard = document.querySelector("#game-board");

  let score = { won: 0, tie: 0, lose: 0};

  const game_logic = {
    'paper': ['stone', 'spock'],
    'stone': ['scissors', 'lizzard'],
    'scissors': ['paper', 'lizzard'],
    'lizzard': ['spock', 'paper'],
    'spock': ['scissors', 'stone'],
  };

  let game_options = Object.keys(game_logic);
  let center_x = window.innerWidth/2 - 45;
  let center_y = window.innerHeight/2 + 40;
  let radius = 150;
  let angle = 72 * Math.PI / 180;

  const whoWon = function(player1, player2){
    if(player1 === player2){
      return'tie';
    }
    return game_logic[player1].includes(player2) ? 'won': 'lose';
  }

  const computerOption = function(){
    let computer_selection = game_options[Math.floor(Math.random() * game_options.length)];
    computer.innerHTML = computer_selection;
    return computer_selection;
  }

  const scoreAccumulate = function(value){
    score[value]++;
    document.querySelector(`#score .${value}`).innerHTML = score[value];
  }

  const selectOption = function(event){
    let user_selection = this.dataset.type;
    user.innerHTML = user_selection;
    let computer_selection = computerOption();
    scoreAccumulate( whoWon(user_selection, computer_selection));
  };

  const createButton = function (index) {
    let button = document.createElement("button");
    button.classList.add("button");
    button.textContent = game_options[index];

    button.style.left = `${radius * Math.cos(index*angle) + center_x}px`;
    button.style.top = `${radius * Math.sin(index*angle) + center_y}px`;

    button.setAttribute("data-type", game_options[index]);
    button.addEventListener("click", selectOption);
    gameboard.appendChild(button);

  }

  const initGame = function () {
    console.log("Starting game");
    for (let index = 0; index < game_options.length; index ++){
      createButton(index);
    }
  }
  initGame();
})();