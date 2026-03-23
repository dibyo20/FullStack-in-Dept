import React from "react";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
