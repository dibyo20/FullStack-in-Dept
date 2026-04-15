import React from "react";
import "../../styles/Search.scss";
import SearchBar from "./SearchBar";
import Year from "./Year";
import Type from "./Type";

const Search = (props) => {
  return (
    <div className="search">
      <div className="search-section">
        <SearchBar setQuery={props.setQuery} />
        <Year />
        <Type />
      </div>
    </div>
  );
};

export default Search;
