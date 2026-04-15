import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar.jsx";
import Search from "../components/SearchBar/Search.jsx";
import Card from "../components/MainContent/Card.jsx";
import "../styles/Card.scss";

const HomePage = () => {
  const [query, setQuery] = useState("Marvel");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}&plot=full`;

      if (year) url += `&y=${year}`;
      if (type) url += `&type=${type}`;

      const { data } = await axios.get(url);

      // const { data } = await axios.get(
      //   `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&y=${year}&type=${type}&page=${page}`,
      // );

      if (data.Response === "True") {
        setMovies((prev) => [...prev, ...(data.Search || [])]);
        console.log(data);
      } else {
        console.log("API ERROR", data.Error);
      }
    };

    fetchMovies();
  }, [query, page, year, type]);

  useEffect(() => {
    if (page < 3) {
      const timer = setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [page]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query, year, type]);

  return (
    <div>
      <Navbar />
      <Search setQuery={setQuery} setYear={setYear} setType={setType}/>
      <div className="card-container">
        {movies.map(function (elem, idx) {
          return <Card data={elem} key={elem.imdbID} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
