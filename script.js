let currentPlayer = 1;

let board = [          
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];


let p1Colour = 'red';
let p2Colour = 'blue';



// reveals the game
function openGame() {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
}


// sets the peice colour to the color the user chooses
function colourSelect() {
   
    p1Colour = document.getElementById('p1-color').value;  
    p2Colour = document.getElementById('p2-color').value;  
    createBoard();  
}


// makes an empty board
function createBoard() {
    const boardElement = document.getElementById('board');  
    boardElement.innerHTML = '';
   
   
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
           
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            
            cell.addEventListener('click', function () {
                placeGamePiece(col); 
            });
            
            boardElement.append(cell);
        }
    }
}


// drops a peice at the lowest possible place in the column, checks if the move is results in a win/draw then moves to the next turn
function placeGamePiece(col) {
   
    for (let row = 5; row >= 0; row--) {

        if (board[0][col] !== null) {
            alert("Cannot Place a Piece Here. Try Again");
            return; 
        }

        if (board[row][col] === null) {  
            board[row][col] = currentPlayer;  
            
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
        
                    const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`); 
        
                    if (board[row][col] === 1) {     
                        cell.style.backgroundColor = p1Colour;
                    } else if (board[row][col] === 2) {   
                        cell.style.backgroundColor = p2Colour;
                    } else {  
        
                        cell.style.backgroundColor = 'gray';
                    }
                }
            }

            
            if (isWinner(row, col)) {  
                updateScore(currentPlayer);  
                return;  
            }

            if (isFull()) {  

                alert("It's a draw!");
                createBoard();  
                return;
            }

            if (currentPlayer === 1) {
                currentPlayer = 2;
            } else {
                currentPlayer = 1;
            }

            return
        }
    }
}


//returns if there is a winner or not, checks all directions
function isWinner(row, col) {

    const player = board[row][col];
    
    const directions = [[0, 1],[1, 0],[1, 1],[1, -1]];
    
    for (let i = 0; i < directions.length; i++) {

        let count = 1;
        const [rowDir, colDir] = directions[i];
        
        count += consecutivePieces(row, col, rowDir, colDir, player);
        count += consecutivePieces(row, col, -rowDir, -colDir, player);
        
        if (count >= 4) {
            return true;
        }
    }
    
    return false;  
}

// counts the amount of consecutive pieces
function consecutivePieces(row, col, rowDir, colDir, player) {
    let count = 0;
    let currRow = row + rowDir;
    let currCol = col + colDir;
    
    while (currRow >= 0 && currRow < board.length && currCol >= 0 && currCol < board[0].length &&board[currRow][currCol] === player) {
        count++;
        currRow += rowDir;
        currCol += colDir;
    }
    
    return count;
}




// itterates through the board and returns if the board is full or not
function isFull() {

    for (let row = 0; row < board.length; row++) {      
        for (let col = 0; col < board[row].length; col++) {  

            if (board[row][col] === null) {  
                return false;  
            }
         }
        }
    return true;
}



let p1Score = 0;  
let p2Score = 0;  


// sends an alert telling the user who won. Updates the players scores. Resets the board
function updateScore(player) {

    alert(`Player ${player} wins!`);

    if (player === 1) {
        p1Score++;
    } else {
        p2Score++;
    }

    document.getElementById('p1-score').innerText = p1Score;
    document.getElementById('p2-score').innerText = p2Score;

    colourSelect();  
}




// resets the game. resets the board and sets the players scores back to zero. Also resets the piece colours
function reset() {
    p1Score = 0;
    p2Score = 0;
    currentPlayer = 1; // Reset current player
    
    // Reset colors to default
    p1Colour = 'red';
    p2Colour = 'blue';
    
    // Reset color inputs
    document.getElementById('p1-color').value = '#ff0000';
    document.getElementById('p2-color').value = '#0000ff';
    
    // Reset scores display
    document.getElementById('p1-score').innerText = '0';
    document.getElementById('p2-score').innerText = '0';
    
    // Recreate board with default colors
    createBoard();
}


// returns to homepage
function quit() {
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.menu').style.display = 'flex';
}

