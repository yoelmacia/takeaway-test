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

  socket.on("message", body => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8)
    });
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
