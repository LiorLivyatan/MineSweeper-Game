import React from "react";
import "./Cell.css";

function Cell(props) {
  const { revealed, value, flagged } = props.children;

  const cellClasses = `cell ${revealed ? "reveal" : ""} ${
    revealed && value === "X" ? "bomb" : ""
  } ${value !== 0 && revealed ? `value-${value}` : ""}`;

  const cellValue = value !== 0 && revealed ? value : "";
  const flagEmoji = flagged && !revealed ? "🚩" : "";

  return (
    <div
      className={cellClasses}
      onContextMenu={props.onRightClick}
      onClick={props.onClick}
    >
      {cellValue === "X" ? "💣" : cellValue}
      {flagEmoji}
    </div>
  );
}

export default Cell;
