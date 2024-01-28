// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const port = 3000;

let latestPayload = null;
let clients = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// WebSocket server setup
const wss = new WebSocket.Server({ port: 3001 });

// Broadcast function to send data to all clients
const broadcast = (data) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Route to handle incoming webhook payloads
app.post('/webhook', (req, res) => {
  // Log the received payload
  console.log('Received webhook payload:', req.body);

  // Store the latest payload
  latestPayload = req.body;

  // Broadcast the latest payload to all clients
  broadcast(JSON.stringify(latestPayload));

  // Respond to the webhook provider
  res.sendStatus(200);
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  // Send the latest payload to the newly connected client
  if (latestPayload) {
    ws.send(JSON.stringify(latestPayload));
  }

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });
});

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
