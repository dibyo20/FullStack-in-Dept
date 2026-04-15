import React from "react";
import "../../styles/CastSection.scss";

const CastSection = ({ movie }) => {
  const cast = movie.Actors.split(",").map((actor) => actor.trim());
  console.log(cast);
  return (
    <div className="cast-section">
      <h2>Top Cast</h2>
      <div className="cast-list">
        {cast.map((actor, idx) => (
          <div className="cast-card" key={idx}>
            <div className="cast-img">
              <img src="https://plus.unsplash.com/premium_vector-1741886314380-b2a92b151526?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>

            <h3>{actor}</h3>
            <p>Actor</p>
          </div>
        ))}
      </div>
      {/* <div className="cast-list">
        <div className="cast-card">
          <div className="cast-img">
            <img
              src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="actor"
            />
          </div>

          <h3>Zo In-sung</h3>
          <p>Manager Zo</p>
        </div>
      </div> */}
    </div>
  );
};

export default CastSection;
