import React from "react";
import Course from "./Course";

const AllCourses = ({data}) => {
  return (
    <div>
      AllCourses
      <Course data={data} />
    </div>
  );
};

export default AllCourses;
