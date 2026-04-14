import React from "react";
import "../../styles/Card.scss";

const Card = (props) => {
  return (
   
      <div className="movie-card">
        <img
          src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
        <div className="rating">⭐5.1</div>
        <div className="overlay">
          <h3>I seduce You</h3>

          <div className="cta">
            <button className="play-btn">▶</button>
            <span>View Details</span>
          </div>
        </div>
      </div>

  );
};

export default Card;
