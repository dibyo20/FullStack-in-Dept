import React from "react";
import "../../styles/Year.scss"

const Year = () => {
  return (
    <select className="filter">
      <option value="">Year</option>
      <option>2024</option>
      <option>2023</option>
      <option>2022</option>
    </select>
  );
};

export default Year;
