import React from "react";
import "./Button.css";

export default function Button(props) {
  const { caption, className, onClick, hidden, rightAligned } = props;
  return hidden ? null : (
    <div
      className={`button ${
        rightAligned === "true" ? "right" : "left"
      } ${className}`}
      onClick={onClick}
    >
      {caption}
    </div>
  );
}
