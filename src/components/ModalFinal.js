import React from "react";
import "./ModalFinal.css";

export default class ModalFinal extends React.Component {
  closeModal() {
    document.getElementById("modalfinal").style.visibility = "hidden";
    this.props.start("start");
  }
  render() {
    return (
      <div className="modalfinal" id="modalfinal">
        <div>
          <img src={this.props.image} alt="logo" className="image" />
        </div>
        <div className="newgamediv">{this.props.message}</div>
        <button className="newgamebutton" onClick={() => this.closeModal()}>
          New Game
        </button>
      </div>
    );
  }
}
