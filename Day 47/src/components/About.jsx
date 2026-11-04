import React from "react";

const About = ({ user }) => {
  console.log("About Rendered");
  return (
    <>
      <h1>About Component</h1>

      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </>
  );
};

export default React.memo(About, (prev, next) => {
  // console.log("prev", prev.user);
  // console.log("next", next.user);
  return prev.user.name === next.user.name && prev.user.age === next.user.age;
});
