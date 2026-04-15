import React from "react";
import "../../styles/Year.scss";

const Year = ({ setYear }) => {
  const currYear = new Date().getFullYear();
  const years = [];
  for (let i = currYear; i >= 1900; i--) {
    years.push(i);
    // console.log(years);
  }
  const handleChange = (e) => {
    setYear(e.target.value);
  };
  return (
    <select
      className="filter"
      onChange={(e) => {
        handleChange(e);
      }}
    >
      <option value="">Year</option>
      {years.map((year, idx) => (
        <option key={idx} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default Year;
