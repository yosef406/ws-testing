// const https = require('https');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use(express.static('public'));


wss.on('connection', function connection(ws) {

    console.log("new Client Connected");

    ws.on('message', function incoming(message) {
        // Broadcast message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(8080, function () {
    console.log('WebSocket server started on wss://localhost:8080');
    console.log('host started on https://localhost:8080');
});