import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Navbar from "./images/navbar.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.socket = socketIOClient("http://localhost:4001");
    this.socket.on("message", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }

  send = event => {
    console.log(event);
    if (event === "start") {
      const body = {
        added: "",
        result: Math.floor(Math.random() * 151) + 1
      };
      const message = {
        body,
        from: "Me"
      };
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit("message", message);
    } else {
      this.state.messages.map((obj, index) => {
        if (obj.from === "Bot" && index === 0) {
          const result = obj.body.result;
          const num = Math.floor([(event + parseInt(result)) / 3]);
          if (num === 1) {
            const body = {
              added: "User Wins",
              result: "User Wins"
            };
            const message = {
              body,
              from: "Me"
            };
            this.setState({ messages: [message, ...this.state.messages] });
            this.socket.emit("message", message);
          } else if (num < 1) {
            const body = {
              added: "Equals",
              result: "Equals"
            };
            const message = {
              body,
              from: "Me"
            };
            this.setState({ messages: [message, ...this.state.messages] });
            this.socket.emit("message", message);
          } else {
            const body = {
              added: "[(" + event + "+" + parseInt(result) + ") / 3] = " + num,
              result: num
            };
            const message = {
              body,
              from: "Me"
            };
            this.setState({ messages: [message, ...this.state.messages] });
            this.socket.emit("message", message);
          }
        }
        return true;
      });
    }
  };

  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <li key={index}>
          <b>
            {message.from}: {message.body.added}
            <br></br>
            {message.from}: {message.body.result}
          </b>
        </li>
      );
    });

    return (
      <div className="container">
        <img src={Navbar} alt="navbar-logo" className="navbar" />
        <h1>Message</h1>
        <button onClick={() => this.send("start")}>Start</button>
        <button onClick={() => this.send(-1)}>-1</button>
        <button onClick={() => this.send(0)}>0</button>
        <button onClick={() => this.send(1)}>1</button>
        {messages}
      </div>
    );
  }
}
export default App;
