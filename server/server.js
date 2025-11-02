require('dotenv').config();
let http = require('http');
let url = require('url');
let api = require('./api');
let model = require('./model');

let extensions = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png'
};

//creat server:
let server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    //
    let q = url.parse(req.url, true).query;
    console.log(q);
    if (req.url.startsWith('/newGame')) {
        api.newGame(req, res, q.username);
    }
    else if (req.url.startsWith('/play')) {
        api.play(req, res, q.gameId, q.col, q.player);
    }
    else if (req.url.startsWith('/getStateBoard')) {
        api.getStateBoard(req, res, q.gameId);
    }

    else if (req.url.startsWith("/joinGame")) {
        api.joinGame(req, res, q.gameId, q.username);
    }
    else if (req.url.startsWith("/sendMessage")) {
        api.sendMessage(req, res, q.username, q.text);
    }
    else if (req.url.startsWith("/getMessages")) {
        api.getMessages(req, res);
    }

    else {
        res.writeHead(404);
        res.end('Not found');
    }
});
server.listen(4000, () => {
    console.log('Server listen to port 4000');
});


