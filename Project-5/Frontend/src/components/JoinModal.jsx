import React, { useState } from "react";
import "../styles/JoinModal.scss";

const JoinModal = ({ announcement, onJoin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onJoin(username.trim());
  };

  return (
    <div className="join-modal">
      <h2 className="join-modal__title">Quiz Arena</h2>
      {announcement && (
        <div className="join-modal__announcement">{announcement}</div>
      )}
      <form className="join-modal__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="join-modal__input"
          placeholder="Enter nickname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="join-modal__button">
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinModal;
