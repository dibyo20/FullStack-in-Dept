import React from "react";

const Course = ({ data }) => {
  return (
    <div>
      Course
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Course;
