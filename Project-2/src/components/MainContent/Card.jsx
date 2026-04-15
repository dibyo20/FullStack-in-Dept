import React from "react";
import "../../styles/Card.scss";

const Card = (props) => {
  return (
   
      <div className="movie-card">
        <img
          src={props.data.Poster}
          alt=""
        />
        <div className="rating">⭐5.1</div>
        <div className="overlay">
          <h3>{props.data.Title}</h3>

          <div className="cta">
            <button className="play-btn">▶</button>
            <span>View Details</span>
          </div>
        </div>
      </div>

  );
};

export default Card;
