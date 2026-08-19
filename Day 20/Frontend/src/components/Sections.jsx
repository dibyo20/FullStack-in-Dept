import React, { useContext } from "react";
import "../styles/Sections.scss";
import { UserDataContext } from "../context/UserContext";

const Sections = () => {
  const data = useContext(UserDataContext);
  return (
    <div className="sections">
      {/* HERO SECTION */}
      <section className="sections__hero">
        <h1 className="sections__title">Build Stunning UI ⚡</h1>

        <p className="sections__subtitle">
          Create modern, responsive and beautiful interfaces with ease using
          ChatpataUI components.
        </p>

        <button className="sections__btn">Get Started with {data}</button>
      </section>
    </div>
  );
};

export default Sections;
