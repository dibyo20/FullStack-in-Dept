import React from "react";
import Courses from "./Courses.jsx";

const AllCourses = ({ data }) => {
  return (
    <div>
      AllCourses
      <Courses data={data} />
    </div>
  );
};

export default AllCourses;
