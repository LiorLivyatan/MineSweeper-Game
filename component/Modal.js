import React from "react";
import "./Modal.css";

function Modal(props) {
  const header = props.status === "win" ? "header win" : "header lose";
  const button = props.status === "win" ? "button win" : "button lose";
  return (
    <>
      <div className="backdrop" onClick={props.onClick} />
      <div className="modal">
        <div className={header}>
          <h2>{props.status === "win" ? "You Win!" : "Game Over!"}</h2>
          <button className={button} onClick={props.onClick}>
            {props.status === "win" ? "Play Again?" : "Try Again?"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
