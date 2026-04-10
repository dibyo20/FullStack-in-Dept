import React from "react";

const Card = ({ onRemove, name, imageURL, role, desc }) => {
  return (
    <div>
      <div className="glass-card">
        <div className="img-div">
          <img src={imageURL} alt={name} className="card-image" />
        </div>

        <div className="card-content">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <p className="desc">{desc}</p>
        </div>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Card;
