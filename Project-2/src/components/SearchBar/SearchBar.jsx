import React, { useState } from "react";
import "../../styles/SearchBar.scss";

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");
  const handleChange = () => {
    if (input.trim() !== "") {
      setQuery(input);
    }
    setInput("");
  };
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search movies or TV shows...."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleChange();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
