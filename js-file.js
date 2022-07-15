let positions = document.querySelectorAll('.position');
let topLeft = document.querySelector(".topLeft");
let topCenter = document.querySelector(".topCenter");
let topRight = document.querySelector(".topRight");
let midLeft = document.querySelector(".midLeft");
let midCenter = document.querySelector(".midCenter");
let midRight = document.querySelector(".midRight");
let bottomLeft = document.querySelector(".bottomLeft");
let bottomCenter = document.querySelector(".bottomCenter");
let bottomRight = document.querySelector(".bottomRight");
let resetButton = document.querySelector('[type=reset]')
let message = document.querySelector('.message');
let menuOverlay = document.querySelector('.menu-overlay');
let startButton = document.querySelector('.start-game');
let menuButton = document.querySelector('.back-to-menu');
let form = document.querySelector('form');
let player1 = document.querySelector('#player-1').value;
let player2 = document.querySelector('#player-2').value;
let topRow = [topLeft.innerText, topCenter.innerText, topRight.innerText];
let midRow = [midLeft.innerText, midCenter.innerText, midRight.innerText];
let bottomRow = [bottomLeft.innerText, bottomCenter.innerText, bottomRight.innerText];
let leftColumn = [topLeft.innerText, midLeft.innerText, bottomLeft.innerText];
let midColumn = [topCenter.innerText, midCenter.innerText, bottomCenter.innerText];
let rightColumn = [topRight.innerText, midRight.innerText, bottomRight.innerText];
let leftDiagonal = [topLeft.innerText, midCenter.innerText, bottomRight.innerText];
let rightDiagonal = [topRight.innerText, midCenter.innerText, bottomLeft.innerText];
let allRows = [topRow, midRow, bottomRow, leftColumn, midColumn, rightColumn, leftDiagonal, rightDiagonal];
let lastPlay = '';
let gameOver = false;


function startGame(e) {
    if(form.checkValidity()) {
        e.preventDefault();
        player1 = document.querySelector('#player-1').value;
        player2 = document.querySelector('#player-2').value;
        resetGame();
        menuOverlay.classList.remove('active');
        document.forms[0].reset();

    }
}
startButton.addEventListener('click',startGame);

function backToMenu() {
    resetGame();
    menuOverlay.classList.add('active');

}
menuButton.addEventListener('click', backToMenu);

// Refreshes all board position values
function updateVariables() {
     positions = document.querySelectorAll('.position');
     topLeft = document.querySelector(".topLeft");
     topCenter = document.querySelector(".topCenter");
     topRight = document.querySelector(".topRight");
     midLeft = document.querySelector(".midLeft");
     midCenter = document.querySelector(".midCenter");
     midRight = document.querySelector(".midRight");
     bottomLeft = document.querySelector(".bottomLeft");
     bottomCenter = document.querySelector(".bottomCenter");
     bottomRight = document.querySelector(".bottomRight");
     resetButton = document.querySelector('[type=reset]')
     message = document.querySelector('.message');
     menuOverlay = document.querySelector('.menu-overlay');
     startButton = document.querySelector('.start-game');
     menuButton = document.querySelector('.back-to-menu');
     form = document.querySelector('form');
     topRow = [topLeft.innerText, topCenter.innerText, topRight.innerText];
     midRow = [midLeft.innerText, midCenter.innerText, midRight.innerText];
     bottomRow = [bottomLeft.innerText, bottomCenter.innerText, bottomRight.innerText];
     leftColumn = [topLeft.innerText, midLeft.innerText, bottomLeft.innerText];
     midColumn = [topCenter.innerText, midCenter.innerText, bottomCenter.innerText];
     rightColumn = [topRight.innerText, midRight.innerText, bottomRight.innerText];
     leftDiagonal = [topLeft.innerText, midCenter.innerText, bottomRight.innerText];
     rightDiagonal = [topRight.innerText, midCenter.innerText, bottomLeft.innerText];
     allRows = [topRow, midRow, bottomRow, leftColumn, midColumn, rightColumn, leftDiagonal, rightDiagonal];
}

// Reset inner text of each board position to blank;
function resetGame() {
        gameOver = false;
        message.innerText = `${player1}'s turn`
        positions.forEach(position => {
            position.innerText = '';
        })
        updateVariables();
        lastPlay = '';
        changePositionValue();
    };
resetButton.addEventListener('click', resetGame);

// Returns true if the row has three equal symbols
function threeInARow(array) {
    const result = array.every(element => {
        if (element === array[0] && element !== '') {
            return true;
        }
    });
    const tie = array.every(element => {
        if (element !== '') {
            return true;
        }
    });
    if(result) {
        return 'won'
    } 
    if(tie) {
        return 'tie'
    }
    return false
}

// Checks for a row that has three equal symbols, returns true if does
function winConditionCheck(array) {
    const winArray = array.map(element => threeInARow(element));
    console.log('winArray: ' + winArray);
    const  someoneWon = winArray.indexOf('won');
    const tieCheck = winArray.every(element => {
        if (element === 'tie') {
            return true;
        }
    });
    if(someoneWon >= 0 || tieCheck) {
        gameOver = true;
        positions.forEach(position => {
            position.removeEventListener('click', clickAction);
        })

        if(someoneWon >= 0) {
            if(allRows[someoneWon].indexOf('O') === 0) {
                message.innerText = `${player1} won!`;
                updateVariables();
                return 
            }
            message.innerText = `${player2} won!`;
            updateVariables();
            return 

        }
        message.innerText = 'it\'s a tie!';
        updateVariables();
        return
    }


    };

// Actions that happen when a position on the board is clicked
function clickAction() {
    if (this.innerText === '') {
        if (lastPlay === '' || lastPlay === 'X') {
            this.innerText = 'O';
            lastPlay = 'O';
            message.innerText = `${player2}'s turn`

        } else if (lastPlay === 'O') {
            this.innerText = 'X';
            lastPlay = 'X';
            message.innerText = `${player1}'s turn`
        };

    }
    updateVariables();
    console.log(allRows);
    winConditionCheck(allRows);

}

// Attaches clickAction on each position's click event listener
function changePositionValue() {
    positions.forEach(position => {
        if( gameOver === false) {
            position.addEventListener('click', clickAction)
        }
    });


};
changePositionValue();

