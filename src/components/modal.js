import React from "react";
import "./modal.css";

export default class Modal extends React.Component {
  closeModal() {
    document.getElementById("modal").style.visibility = "hidden";
    this.props.start("start");
  }
  render() {
    return (
      <div className="modal" id="modal">
        <div className="newgamediv">{"{-1, 0, 1}"}</div>
        <button className="newgamebutton" onClick={() => this.closeModal()}>
          Start Game
        </button>
      </div>
    );
  }
}
