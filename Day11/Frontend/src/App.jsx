import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar
        bgColor="blue"
        title="My App"
        links={["Home, About, Contact, Blogs"]}
      />
      <Navbar
        bgColor="red"
        title="My App"
        links={["Home, About, Contact, Blogs"]}
      />
      <Navbar
        bgColor="green"
        title="My App"
        links={["Home, About, Contact, Blogs"]}
      />
    </>
  );
};

export default App;
