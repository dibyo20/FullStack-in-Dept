import React from "react";
import "../../styles/Search.scss";
import SearchBar from "./SearchBar";
import Year from "./Year";
import Type from "./Type";

const Search = () => {
  return (
    <div className="search">
      <div className="search-section">
        <SearchBar />
        <Year />
        <Type />
      </div>
    </div>
  );
};

export default Search;
