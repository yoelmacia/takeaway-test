import React from "react";
import "./Messages.css";
import User from "../images/user.png";
import Bot from "../images/bot.png";

export default class Messages extends React.Component {
  render() {
    const messages = this.props.messages
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
    return <ul className="nav">{messages}</ul>;
  }
}
