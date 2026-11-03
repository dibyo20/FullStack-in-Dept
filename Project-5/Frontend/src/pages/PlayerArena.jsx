import React, { useState } from "react";
import { useQuizSocket } from "../hooks/useQuizSocket";
import BuzzerButton from "../components/BuzzerButton";
import QuestionCard from "../components/QuestionCard";
import Leaderboard from "../components/Leaderboard";
import JoinModal from "../components/JoinModal";
import "../styles/PlayerArena.scss";

const PlayerArena = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const {
    question,
    buzzerWinner,
    leaderboard,
    statusMessage,
    announcement,
    isBuzzerActive,
    join,
    buzz,
    answer
  } = useQuizSocket();

  const handleJoin = (name) => {
    join(name, (res) => {
      if (res.success) {
        setUsername(name);
        setIsJoined(true);
      }
    });
  };

  const handleBuzz = () => {
    buzz();
  };

  const handleSelectOption = (option) => {
    answer(option);
  };

  if (!isJoined) {
    return <JoinModal announcement={announcement} onJoin={handleJoin} />;
  }

  const isWinner = buzzerWinner === username;

  return (
    <div className="player-arena">
      <header className="player-arena__header">
        <span className="player-arena__user">Player: {username}</span>
        <span className="player-arena__status">{statusMessage}</span>
      </header>

      {question && (
        <QuestionCard
          question={question}
          isWinner={isWinner}
          onSelectOption={handleSelectOption}
        />
      )}

      {question && (
        <BuzzerButton
          disabled={!isBuzzerActive || buzzerWinner !== null}
          onBuzz={handleBuzz}
        />
      )}

      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default PlayerArena;
