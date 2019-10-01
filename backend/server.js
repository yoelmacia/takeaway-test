const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on("connection", socket => {
  console.log("User connected");

  socket.on("message", result => {
    console.log(result);
    const body = calculateValueBot(result);
    const message = {
      body,
      from: "Bot"
    };
    setTimeout(function() {
      socket.emit("message", message);
    }, 2000);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// Functions

function calculateValueBot(body) {
  const random = Math.floor(Math.random() * 3) - 1;
  const num = Math.floor([(random + parseInt(body.body.result)) / 3]);
  const resultNumber = {
    added: "[(" + random + "+" + parseInt(body.body.result) + ") / 3] = " + num,
    result: num
  };
  console.log(resultNumber);
  return resultNumber;
}