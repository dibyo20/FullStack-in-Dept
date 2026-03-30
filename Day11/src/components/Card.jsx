import React from "react";

const Card = (props) => {
  return (
    <div className="navbar" style={{ backgroundColor: props.color }}>
      <div className="logo">Logo</div>
      <div className="nav">
        <ul>
          <li>Home</li>
          <li>Section</li>
          <li>Projects</li>
          <li>Contacts</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
