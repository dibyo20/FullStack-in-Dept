import React from "react";
import "../../styles/Card.scss";
import { FaRegPlayCircle } from "react-icons/fa";

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
            <span className="play-btn"><FaRegPlayCircle /></span>
            <span>View Details</span>
          </div>
        </div> 
      </div>

  );
};

export default Card;
