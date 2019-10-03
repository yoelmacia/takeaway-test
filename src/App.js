import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Navbar from "./images/navbar.png";
import User from "./images/user.png";
import Bot from "./images/bot.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      replyUser: []
    };
  }

  componentDidMount() {
    this.socket = socketIOClient("http://localhost:4001");
    this.socket.on("message", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }

  send = event => {
    if (event === "start") {
      const body = {
        added: "",
        result: Math.floor(Math.random() * 151) + 1,
        event: event
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
              result: "User Wins",
              event: event
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
              result: "Equals",
              event: event
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
              result: num,
              event: event
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
    const messages = this.state.messages
      .slice(0)
      .reverse()
      .map((message, index) => {
        return (
          <li key={index}>
            <b>
              {message.from === "Me" ? (
                <div>
                  <button className="replyUser">{message.body.event}</button>
                  <button className="iconUser">
                    <img src={User} alt="user-icon" className="userLogo" />
                  </button>
                </div>
              ) : (
                <div>
                  <button className="replyBot">{message.body.random}</button>
                  <button className="iconBot">
                    <img src={Bot} alt="bot-icon" className="botLogo" />
                  </button>
                </div>
              )}
              <br></br>
              <div className="messagesdiv">
                <div className="textdiv">{message.body.added}</div>
              </div>
              <br></br>
              <div className="messagesdiv">
                <div className="textdiv">{message.body.result}</div>
              </div>
            </b>
          </li>
        );
      });

    return (
      <div className="container">
        <img src={Navbar} alt="navbar-logo" className="navbar" />
        <button onClick={() => this.send("start")}>Start</button>
        <div className="buttondiv">
          <button className="bluebutton" onClick={() => this.send(-1)}>
            -1
          </button>
          <button className="bluebutton" onClick={() => this.send(0)}>
            0
          </button>
          <button className="bluebutton" onClick={() => this.send(1)}>
            1
          </button>
        </div>
        {messages}
      </div>
    );
  }
}
export default App;
