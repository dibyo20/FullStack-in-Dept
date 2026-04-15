import React from "react";
import "../../styles/MovieMeta.scss"

const MovieMeta = ({movie}) => {
  return (
    <div className="hero-content">
      <h1>{movie.Title}</h1>
      <p>
        {movie.Plot}
      </p>
    </div>
  );
};

export default MovieMeta;
