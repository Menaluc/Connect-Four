require('dotenv').config();
let mysql = require('mysql');
let url = require('url');

let connParams = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

};

let pool = mysql.createPool(connParams);

function createNewGame() {
    let board = [];
    for (let i = 0; i < 6; i++) {
        board.push(new Array(7).fill(0));

    }
    return board;

}

//Befor we save it we tranclete to json
function boardOnJson(board) {
    return JSON.stringify(board);
}
//back to board from Json
function backToBoard(boardInJson) {
    let JsonToBoard = JSON.parse(boardInJson);
    console.log("back to board:", JsonToBoard);
    return JsonToBoard;
}

function inputDisc(board, col, playerValue) {
    if (col < 0 || col > 6) {
        return null;
    }

    for (let row = 5; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = playerValue;
            break;
        }
    }
    return board;
}

//Check if col is full
function isColFull(board, col) {
    if (board[0][col] != 0)
        return true;
    return false;
}
// check if board is full 
function isBoardFull(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0)/// ===
                return false;// there is empty cell-> board is not full
        }
    }
    return true;// board is full it means -> tie
}

//check who win and return
function whoWin(board) {
    let rows = 6;
    let cols = 7;
    //Check rows
    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols - 4; j++) {
            let value = board[i][j];

            if (value != 0 && value == board[i][j + 1] && value == board[i][j + 2] && value == board[i][j + 3]) {
                return value; // Return the winner
            }

        }
    }
    //Check cols
    for (let j = 0; j < cols; j++) {
        for (i = 0; i < rows - 4; i++) {
            let value = board[i][j];
            if (value != 0 && value == board[i + 1][j] && value == board[i + 2][j] && value == board[i + 3][j]) {
                return value;
            }

        }
    }
    // Check diagonal from left to right
    for (i = 0; i < rows - 4; i++) {
        for (let j = 0; j < cols - 4; j++) {
            let value = board[i][j];
            if (value != 0 && value == board[i + 1][j + 1] && value == board[i + 2][j + 2] && value == board[i + 3][j + 3]) {
                return value;
            }
        }
    }
    // Check diagonal from right to left
    for (i = 3; i < rows; i++) {
        for (let j = 0; j < cols - 4; j++) {
            let value = board[i][j];
            if (value != 0 && value == board[i - 1][j + 1] && value == board[i - 2][j + 2] && value == board[i - 3][j + 3]) {
                return value;
            }
        }
    }

    return 0; //NO winner yet
}

exports.createNewGame = createNewGame;
exports.inputDisc = inputDisc;
exports.whoWin = whoWin;
exports.boardOnJson = boardOnJson;
exports.backToBoard = backToBoard;
exports.isColFull = isColFull;
exports.isBoardFull = isBoardFull;
