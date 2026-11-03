import React from "react";
import "../styles/Leaderboard.scss";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h4 className="leaderboard__title">Leaderboard</h4>
      {leaderboard.length === 0 ? (
        <p className="leaderboard__empty">No scores recorded.</p>
      ) : (
        <ul className="leaderboard__list">
          {leaderboard.map((item, index) => (
            <li key={index} className="leaderboard__item">
              <span className="leaderboard__name">{index + 1}. {item.username}</span>
              <span className="leaderboard__score">{item.score} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
