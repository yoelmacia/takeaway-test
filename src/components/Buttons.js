import React from "react";
import "./Buttons.css";

export default class Buttons extends React.Component {
  render() {
    return (
      <div className="buttondiv">
        <button className="bluebutton" onClick={() => this.props.send(-1)}>
          -1
        </button>
        <button className="bluebutton" onClick={() => this.props.send(0)}>
          0
        </button>
        <button className="bluebutton" onClick={() => this.props.send(1)}>
          1
        </button>
      </div>
    );
  }
}
