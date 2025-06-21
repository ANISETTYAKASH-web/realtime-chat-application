const express = require("express");
const app = express();
const webSockets = require("ws");

const myServer = app.listen(9876);

const wsServer = new webSockets.Server({
  noServer: true,
});

wsServer.on("connection", (ws) => {
  ws.on("message", (msg) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState === webSockets.OPEN && client != ws) {
        client.send(msg.toString());
      }
    });
  });
});

myServer.on("upgrade", async (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, function done(ws) {
    wsServer.emit("connection", ws, request);
  });
});
