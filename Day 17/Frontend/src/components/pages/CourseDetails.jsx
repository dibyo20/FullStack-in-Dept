import React from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  return <div className='component'>CourseDetails</div>;
};

export default CourseDetails;
