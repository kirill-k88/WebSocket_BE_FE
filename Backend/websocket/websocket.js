const ws = require('ws');
require('dotenv').config();

const { PORTWS = 5000 } = process.env;

const wsServer = new ws.Server({ port: PORTWS }, () => {
  console.log(`webSocket listening on port ${PORTWS}`);
});

wsServer.on('connection', function connection(ws) {
  ws.on('message', (data, isBinary) => {
    let message = isBinary ? data : data.toString();
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        sendMessageToAll(message);
        break;
      case 'connection':
        sendMessageToAll(message);
        break;
    }
  });
});

const sendMessageToAll = message => {
  const messageString = JSON.stringify(message);

  wsServer.clients.forEach(c => {
    if (c.readyState === ws.OPEN) {
      c.send(messageString);
    }
  });
};
