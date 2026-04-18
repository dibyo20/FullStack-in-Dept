import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../pages/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> // This will render the child component of the Layout component
      <Footer />
    </>
  );
};

export default Layout;
