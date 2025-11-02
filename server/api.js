let mysql = require('mysql');
let model = require('./model');
let connParams = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

let pool = mysql.createPool(connParams);
//Creat a new game
function newGame(req, res, username) {
    pool.query("DELETE FROM messages", () => {
        let board = model.createNewGame();
        let boardJson = model.boardOnJson(board);
        pool.query("INSERT INTO games(redPlayer, yellowPlayer, board, turn, status) VALUES (?,?,?,?,?)", [username, null, boardJson, 'red', 'waiting'], (err, result) => {// yellow [null]
            if (err) {
                console.error("DB Error1:", err);///
                res.writeHead(500);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end("New game, gameId:" + result.insertId);
        }
        );

    })

}

function joinGame(req, res, gameId, username) {
    pool.query(
        "UPDATE games SET yellowPlayer=?, `status` ='active' WHERE gameId=?", [username, gameId], (err, result) => {
            if (err) {
                console.error("error joinGame:", err);
                res.writeHead(500);
                res.end("error joinGame");
                return;
            }
            if (result.affectedRows === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "You cannot join to this game" }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Joined successfully", gameId: gameId, yellowPlayer: username, status: "active"
            }));
        }
    );
}

function play(req, res, gameId, col, player) {
    pool.query("SELECT board, turn, status FROM games WHERE gameId=?", [gameId], (err, result) => {
        if (err) {
            res.writeHead(500);
            res.end("error");
            return;
        }
        else if (result.length == 0) {
            res.writeHead(404);
            res.end("Game not found");
            return;
        }

        //check if there is an active game
        if (result[0].status !== "active") {
            res.writeHead(400);
            res.end("Game not active");
            return;
        }

        //check if its the current player turn
        if (result[0].turn !== player) {
            //res.writeHead(400);
            //n
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Not your turn" }));


            //res.end("Not your turn");
            return;
        }

        //check if its legal step
        col = parseInt(col);
        if (isNaN(col) || col < 0 || col > 6) {
            //res.writeHead(400);
            //n
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid column" }));

            //res.end("Invalid column");
            return;
        }

        // back board from DB
        let board = model.backToBoard(result[0].board);

        //check if col is full
        if (model.isColFull(board, col)) {
            // res.writeHead(400);
            //n
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Column is full" }));
            //res.end("Column is full");
            return;
        }

        //Red-1 Yellow-2
        let playerValue = (player === "red") ? 1 : 2;
        board = model.inputDisc(board, col, playerValue);

        let boardJson = model.boardOnJson(board);
        let newStatus = result[0].status;

        // שינוי → בדיקת מנצח מחזירה 1/2, מתורגמת ל-red/yellow
        let winner = model.whoWin(board); // 0 / 1 / 2
        let winnerName = (winner === 1) ? "red" : (winner === 2 ? "yellow" : null);

        if (winnerName) {
            newStatus = "finished";
        } else if (model.isBoardFull(board)) {
            newStatus = "finished";
        }

        // שינוי → קביעת תור הבא red/yellow (לא redPlayer)
        let nextTurn = (player === "red") ? "yellow" : "red";

        //Update the board
        pool.query("UPDATE games SET board=?, turn=?, status=? WHERE gameId=?",
            [boardJson, nextTurn, newStatus, gameId],
            (err, result) => {
                if (err) {
                    console.log("error play update:", err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end("error update");
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });

                // שינוי → החזרת winnerName + turn אחיד
                res.end(JSON.stringify({
                    gameId,
                    board,
                    turn: nextTurn,
                    status: newStatus,
                    winner: winnerName
                }));
            }
        );
    });
}

function getStateBoard(req, res, gameId) {

    pool.query("SELECT board, turn, status FROM games WHERE gameId=?", [gameId], (err, result) => {
        if (err) {
            res.writeHead(500);
            res.end("error");
            return;
        }
        else if (result.length == 0) {
            res.writeHead(404);
            res.end("Game not found");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ turn: result[0].turn, board: result[0].board, status: result[0].status }));
        //res.end(result[0].board);// send to client current state 
    });
}

//CHATT
function sendMessage(req, res, sender, text) {
    //TEST
    console.log("Trying to insert:", sender, text);
    //TESTT
    pool.query(
        "INSERT INTO messages (sender, content) VALUES (?, ?)", [sender, text], (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end("DB error2");
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ id: result.insertId, sender, text }));
        }
    );
}

function getMessages(req, res) {
    pool.query(
        //*"SELECT sender, content, messages_id FROM messages WHERE messages_id=? ORDER BY messages_id ASC", [text], (err, result) => { //
        "SELECT sender, content, messages_id FROM messages ORDER BY messages_id ASC", (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end("DB error3");
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        }
    );
}

// לייצא בסוף הקובץ
exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
exports.newGame = newGame;
exports.play = play;
exports.getStateBoard = getStateBoard;
exports.joinGame = joinGame;



