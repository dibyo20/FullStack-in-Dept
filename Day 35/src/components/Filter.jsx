import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter :</label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default Filter;
