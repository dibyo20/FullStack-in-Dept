import React from "react";
import "../../styles/Poster.scss";
const Poster = ({movie}) => {
  return (
    <div className="poster-card">
      <img
        src={movie.Poster}
        alt={movie.Title} 
      />
    </div>
  );
};

export default Poster;
