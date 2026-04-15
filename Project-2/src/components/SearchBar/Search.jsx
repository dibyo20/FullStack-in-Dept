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
        <Year setYear={props.setYear} />
        <Type setType={props.setType} />
      </div>
    </div>
  );
};

export default Search;
