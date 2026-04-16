import React from "react";

const Card = ({ data }) => {
  const c1 = Math.floor(Math.random() * 256);
  const c2 = Math.floor(Math.random() * 256);
  const c3 = Math.floor(Math.random() * 256);

  return (
    <div className="card">
      <div className="card__image">
        <img src={data.image} alt="Product" />
        <span className="card__badge">New</span>
      </div>

      <div
        className="card__content"
        style={{ backgroundColor: `rgba(${c1}, ${c2}, ${c3}, 0.15)` }}
      >
        <div className="card__header">
          <h3>{data.title}</h3>
          <span className="card__category">{data.category}</span>
        </div>

        <p className="card__desc">{data.description}</p>

        <div className="card__footer">
          <span className="card__price">${data.price}</span>
          <button className="card__btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;