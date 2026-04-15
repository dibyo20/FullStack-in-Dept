import React from "react";
import "../../styles/InfoSection.scss";

const InfoSection = ({ movie }) => {
  return (
    <div className="info-section">
      <h2>Movie Overview</h2>

      <p>{movie.Plot}</p>

      <div className="meta-grid">
        <div className="meta-item">
          <span className="head">RATING</span>
          <strong>⭐{movie.imdbRating}</strong>
        </div>

        <div className="meta-item">
          <span className="head">RELEASE</span>
          <strong>{movie.Year}</strong>
        </div>

        <div className="meta-item">
          <span className="head">LANGUAGE</span>
          <strong>{movie.Language}</strong>
        </div>

        <div className="meta-item">
          <span className="head">RUNTIME</span>
          <strong>{movie.Runtime}</strong>
        </div>

        <div className="meta-item">
          <span className="head">GENRE</span>
          <strong>{movie.Genre}</strong>
        </div>

        <div className="meta-item">
          <span className="head">DIRECTOR</span>
          <strong>{movie.Director}</strong>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
