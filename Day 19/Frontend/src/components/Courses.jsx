import React from "react";

const Courses = ({ data }) => {
  return (
    <div>
      Courses
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Courses;
