/**
 *  ULP - Eng Informática (2021-22)
 *  Programação de Sistemas Distribuídos
 *  DATA: 07-03-2022
 *  Exemplo da aula:   server-websocket
 *  servidor para permitir ligação com webSocket
 *  --------------------------------------------------------------------------------------   */
const express =require("express");
const path = require("path");
const {Server} = require("ws");

const app = express();

/**
 * HTTP Server
 */
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'client-websocket.html')));

const httpServer = app.listen(5000, 'localhost', () => {
    console.log('HTTP server is listening on localhost:5000');
});

/** 
 * WebSocket Server
 */
const wsServer = new Server({port:5085}); // Starts the WebSocket server on port 8085
console.log('WebSocket server is listening on localhost:5085');

wsServer.on('connection',
    wsClient => {
        wsClient.send('Mensagem enviada pelo servidor WebSocket...');
        wsClient.onerror = (error) =>   console.log(`The server received: ${error['code']}`);
    }
);