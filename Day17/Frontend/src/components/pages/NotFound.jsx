import React from "react";
import { Link } from "react-router-dom";
import "../../style/NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound__card">
        <h1 className="notfound__title">404</h1>

        <p className="notfound__text">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link to="/" className="notfound__btn">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
