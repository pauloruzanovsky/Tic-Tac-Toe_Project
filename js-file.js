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
let endingMessage = document.querySelector('.ending-message');
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

// Refreshes all board position values
function updateVariables() {
     topLeft = document.querySelector(".topLeft");
     topCenter = document.querySelector(".topCenter");
     topRight = document.querySelector(".topRight");
     midLeft = document.querySelector(".midLeft");
     midCenter = document.querySelector(".midCenter");
     midRight = document.querySelector(".midRight");
     bottomLeft = document.querySelector(".bottomLeft");
     bottomCenter = document.querySelector(".bottomCenter");
     bottomRight = document.querySelector(".bottomRight");
     endingMessage = document.querySelector('.ending-message');
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
        endingMessage.innerText = '';
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
                endingMessage.innerText = 'player 1 won!';
                updateVariables();
                return 
            }
            endingMessage.innerText = 'player 2 won!';
            updateVariables();
            return 

        }
        endingMessage.innerText = 'it\'s a tie!';
        updateVariables();
    }


    };

// Actions that happen when a position on the board is clicked
function clickAction() {
    if (this.innerText === '') {
        if (lastPlay === '' || lastPlay === 'X') {
            this.innerText = 'O';
            lastPlay = 'O';
        } else if (lastPlay === 'O') {
            this.innerText = 'X';
            lastPlay = 'X';
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

