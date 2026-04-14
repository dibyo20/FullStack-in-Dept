import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar.jsx";
import Search from "../components/SearchBar/Search.jsx";
import Card from "../components/MainContent/Card.jsx";
import "../styles/Card.scss";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`,
      );
      if (data.Response === "True") {
        setMovies(data.Search);
        console.log(movies);
      } else {
        console.log("API ERROR", data.Error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <Search />
      <div className="card-container">
        {movies.map(function (elem, idx) {
          return <Card data={elem} key={idx} />;
        })}
        {/* <Card /> */}
      </div>
    </div>
  );
};

export default HomePage;
