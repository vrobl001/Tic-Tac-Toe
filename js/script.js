// IPO
// Input Process Output
// 1) Define the inputs - Constants and State Variables

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const KEY = {
    '-1': 'O',
    '1': 'X',
    'null': ''
}

// Things that change: turn, winner, gameboard

let turn, winner, gameboard;

// We need to cache element references

const squares = document.querySelectorAll('.square');
const message = document.getElementById('message')

// Define our process

// Add event listeners
document.querySelector('#gameboard').addEventListener('click', handleClick);
document.querySelector('#reset').addEventListener('click', init);

// This is where we start or restart our game
init(); // Call the function to start the game

function init() {
    winner = false; // we don't have a winner - starting from zero
    turn = 1;
    gameboard = [null, null, null, null, null, null, null, null, null];
    render();
}

// Assign clicked square to a variable
function handleClick(evt) {
    const selectedIndex = parseInt(evt.target.dataset.index);
    if(gameboard[selectedIndex] || winner) return;
    gameboard[selectedIndex] = turn;
    turn *= -1;
    winner = checkwinner();
    console.log('check winner: ' + winner);
    render(); 
}

function checkwinner() {
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(gameboard[COMBOS[i][0]] + 
            gameboard[COMBOS[i][1]] + 
            gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]];
    }
    if(gameboard.includes(null)) return false;
    return 'T';
    }

function render() {
    gameboard.forEach(function(elem, index){
        squares[index].textContent = KEY[elem];
    });
    message.textContent = `${KEY[turn]}'s turn'`;
    if(winner === 1) alert('X wins!');
    if(winner === -1) alert('Y wins!');
    if(winner === 'T') alert('Tie!');
}

