import React, { Component } from "react";
import socketIOClient from "socket.io-client";

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
      console.log(message);
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }

  send = event => {
    const body = event.target.value;
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: "Me"
      };
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit("message", body);
      event.target.value = "";
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
      <div>
        <h1>Message</h1>
        <input type="text" placeholder="Enter a message" onKeyUp={this.send} />
        {messages}
      </div>
    );
  }
}
export default App;
