import React, { useState } from "react";
import { quizSocketService } from "../services/quizSocketService";
import "../styles/AdminDashboard.scss";

const AdminDashboard = () => {
  const [status, setStatus] = useState("Idle");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStart = () => {
    quizSocketService.startQuiz((res) => {
      setStatus(res.message);
      setQuizStarted(true);
    });
  };

  const handleNext = () => {
    quizSocketService.nextQuestion((res) => {
      if (res.success) {
        setStatus(`Dispatched Question ${res.questionOrder}`);
      } else {
        setStatus(res.message);
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard__title">Admin Dashboard</h2>
      <div className="admin-dashboard__status">{status}</div>
      <div className="admin-dashboard__actions">
        <button
          className="admin-dashboard__btn"
          disabled={quizStarted}
          onClick={handleStart}
        >
          Start Quiz
        </button>
        <button
          className="admin-dashboard__btn"
          disabled={!quizStarted}
          onClick={handleNext}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
