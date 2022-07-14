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

function resetGame() {
    gameOver = false;
}
// Returns true if the row has three equal symbols
function threeInARow(array) {
    const result = array.every(element => {
        if (element === array[0] && element !== '') {
            return true;
        }
    });
    return result;

}

// Checks for a row that has three equal symbols, returns true if does
function winConditionCheck(array) {
    const winArray = array.map(element => threeInARow(element));
    console.log(winArray);
    const  someoneWon = winArray.indexOf(true);
    if(someoneWon >= 0) {
        gameOver = true;
        positions.forEach(position => {
            position.replaceWith(position.cloneNode(true));
        })
        if(allRows[someoneWon].indexOf('O') === 0) {
            return console.log('Player 1 Won!')
        }
        return console.log('Player 2 Won!')

    }
    return console.log('someone won: ' + (someoneWon >= 0));
    };

// Actions on click: updates position value, refresh variables and checks if someone won
(function changePositionValue() {
    positions.forEach(position => {
        if( gameOver === false) {
            position.addEventListener('click', function() {
                if (position.innerText === '') {
                    if (lastPlay === '' || lastPlay === 'X') {
                        position.innerText = 'O'
                        lastPlay = 'O';
                    } else if ( lastPlay === 'O') {
                        position.innerText = 'X';
                        lastPlay = 'X';
                    };

                }
                updateVariables();
                console.log(allRows);
                winConditionCheck(allRows);

            })
        }
    });


})();

