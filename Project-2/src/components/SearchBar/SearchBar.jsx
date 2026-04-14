import React from "react";
import "../../styles/SearchBar.scss"

const SearchBar = () => {
  return (
    <div className="search-input">
      <input type="text" placeholder="Search movies or TV shows...." />
    </div>
  );
};

export default SearchBar;
