import React from "react";
import { Outlet } from "react-router-dom";

const AllCourse = () => {
  return (
    <>
      <div>AllCourse</div>
      <Outlet /> // Outlet is used to render the child routes, So it will render the child routes of AllCourse
    </>
  );
};

export default AllCourse;
