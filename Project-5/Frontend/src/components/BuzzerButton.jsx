import React from "react";
import "../styles/BuzzerButton.scss";

const BuzzerButton = ({ disabled, onBuzz }) => {
  return (
    <button className="buzzer-btn" disabled={disabled} onClick={onBuzz}>
      BUZZ
    </button>
  );
};

export default BuzzerButton;
