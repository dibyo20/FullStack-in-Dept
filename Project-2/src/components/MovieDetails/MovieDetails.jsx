import React from "react";
import "../../styles/MovieDetails.scss";
import HeroSection from "./HeroSection.jsx";
import MovieMeta from "./MovieMeta.jsx";
import Poster from "./Poster.jsx";
import CastSection from "./CastSection.jsx";
import InfoSection from "./InfoSection.jsx";

const MovieDetails = () => {
  return (
    <div className="moviedetails">
      <HeroSection />

      <div className="hero-overlay">
        <MovieMeta />
      </div>

      <div className="main-content">
        <div className="left">
          <Poster />
        </div>

        <div className="right">
          <InfoSection />
          <CastSection />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
