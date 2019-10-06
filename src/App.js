import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Navbar from "./images/navbar.png";
import Lose from "./images/lose.png";
import Win from "./images/win.png";
import Equals from "./images/equals.png";
import ReactDOM from "react-dom";
import Modal from "./components/Modal";
import ModalFinal from "./components/ModalFinal";
import Buttons from "./components/Buttons";
import Messages from "./components/Messages";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.baseState = this.state;
  }

  resetState = () => {
    this.setState(this.baseState);
  };

  componentDidMount() {
    this.socket = socketIOClient("http://localhost:4001");
    this.socket.on("message", message => {
      this.setState({ messages: [message, ...this.state.messages] });
      this.scrollToElement();
    });
  }

  componentDidUpdate() {
    this.scrollToElement();
  }

  scrollToElement = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };

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
      this.socket.emit("message", message);
      this.scrollToElement();
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
            this.scrollToElement();
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
            this.scrollToElement();
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
            this.scrollToElement();
            this.socket.emit("message", message);
          }
        }
        return true;
      });
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.messages.map((message, index) => {
          if (message.body.result === "User Wins") {
            return (
              <ModalFinal
                reset={this.resetState}
                image={Win}
                message="You win"
                start={this.send}
                key={index}
              />
            );
          } else if (message.body.result === "Bot Wins") {
            return (
              <ModalFinal
                reset={this.resetState}
                image={Lose}
                message="You lose"
                start={this.send}
                key={index}
              />
            );
          } else if (message.body.result === "Equals") {
            return (
              <ModalFinal
                reset={this.resetState}
                image={Equals}
                message="Equals"
                start={this.send}
                key={index}
              />
            );
          }
          return true;
        })}
        <Modal start={this.send} />
        <img src={Navbar} alt="navbar-logo" className="navbar" />
        <Messages ref="messageList" messages={this.state.messages} />
        <Buttons send={this.send} />
      </div>
    );
  }
}
export default App;
