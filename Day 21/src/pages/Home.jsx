import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__title">
          Welcome to <span>Your Store</span>
        </h1>

        <p className="home__subtitle">
          Discover premium products with a bold experience. Designed for
          performance, styled with elegance.
        </p>

        <button className="home__btn" onClick={() => navigate("/products")}>
          Explore Products
        </button>

        <div className="home__cards">
          <div className="card">
            <h3>Premium Quality</h3>
            <p>Only the best curated products for you.</p>
          </div>

          <div className="card">
            <h3>Fast Delivery</h3>
            <p>Get your products delivered quickly.</p>
          </div>

          <div className="card">
            <h3>Best Deals</h3>
            <p>Affordable prices with exclusive offers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
