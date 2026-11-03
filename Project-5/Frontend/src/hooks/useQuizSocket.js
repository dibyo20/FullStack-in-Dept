import { useState, useEffect } from "react";
import { quizSocketService } from "../services/quizSocketService";

export const useQuizSocket = () => {
  const [question, setQuestion] = useState(null);
  const [buzzerWinner, setBuzzerWinner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);

  useEffect(() => {
    quizSocketService.onAnnouncement((data) => {
      setAnnouncement(data.message);
    });

    quizSocketService.onQuestion((q) => {
      setQuestion(q);
      setBuzzerWinner(null);
      setIsBuzzerActive(true);
      setStatusMessage("Question active. Press the buzzer.");
    });

    quizSocketService.onBuzzerLocked((data) => {
      setBuzzerWinner(data.winnerName);
      setIsBuzzerActive(false);
      setStatusMessage(`Buzzer locked by ${data.winnerName}.`);
    });

    quizSocketService.onBuzzerUnlocked((data) => {
      setBuzzerWinner(null);
      setIsBuzzerActive(true);
      setStatusMessage(data.message || "Buzzer unlocked.");
    });

    quizSocketService.onAnswerResult((res) => {
      setLeaderboard(res.leaderboard || []);
      const resultText = res.isCorrect ? "Correct" : "Incorrect";
      setStatusMessage(`${res.username}: ${resultText}. Answer: ${res.correctAnswer}`);
    });

    quizSocketService.onQuizEnded((res) => {
      setQuestion(null);
      setLeaderboard(res.leaderboard || []);
      setStatusMessage("Quiz concluded.");
    });

    return () => {
      quizSocketService.unsubscribeAll();
    };
  }, []);

  const join = (username, callback) => quizSocketService.joinQuiz(username, callback);
  const buzz = (callback) => quizSocketService.pressBuzzer(callback);
  const answer = (selectedAnswer, callback) => quizSocketService.submitAnswer(selectedAnswer, callback);

  return {
    question,
    buzzerWinner,
    leaderboard,
    statusMessage,
    announcement,
    isBuzzerActive,
    join,
    buzz,
    answer
  };
};
