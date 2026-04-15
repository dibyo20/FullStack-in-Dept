import React from "react";
import "../../styles/Type.scss";

const Type = ({ setType }) => {
  const handleChnage = (e) => {
    setType(e.target.value);
  };
  return (
    <select
      className="filter"
      onChange={(e) => {
        handleChnage(e);
      }}
    >
      <option value="">All</option>
      <option value="movie">Movie</option>
      <option value="series">Series</option>
    </select>
  );
};

export default Type;
