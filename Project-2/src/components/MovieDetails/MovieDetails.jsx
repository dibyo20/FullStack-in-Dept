import React from "react";
import "../../styles/MovieDetails.scss";
import HeroSection from "./HeroSection.jsx";
import MovieMeta from "./MovieMeta.jsx";
import Poster from "./Poster.jsx";
import CastSection from "./CastSection.jsx";
import InfoSection from "./InfoSection.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
      );

      if (data.Response === "True") {
        setMovie(data);
      } else {
        console.log("API ERROR:", data.Error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="moviedetails">
      <HeroSection movie={movie} />

      <div className="hero-overlay">
        <MovieMeta movie={movie} />
      </div>

      <div className="main-content">
        <div className="left">
          <Poster movie={movie} />
        </div>

        <div className="right">
          <InfoSection movie={movie} />
          <CastSection movie={movie} />
        </div>
      </div>
      {console.log(movie)}
    </div>
  );
};

export default MovieDetails;
