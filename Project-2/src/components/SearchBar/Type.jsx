import React from "react";
import "../../styles/Type.scss"

const Type = () => {
  return (
    <select className="filter">
      <option value="movie">Movie</option>
      <option value="series">Series</option>
      <option value="episode">Episode</option>
    </select>
  );
};

export default Type;
