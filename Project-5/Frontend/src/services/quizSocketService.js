import { socket } from "../config/socket";

export const quizSocketService = {
  joinQuiz: (username, callback) => {
    socket.emit("quiz:join", { username }, callback);
  },

  pressBuzzer: (callback) => {
    socket.emit("buzzer:press", {}, callback);
  },

  submitAnswer: (selectedAnswer, callback) => {
    socket.emit("answer:submit", { selectedAnswer }, callback);
  },

  startQuiz: (callback) => {
    socket.emit("admin:start_quiz", {}, callback);
  },

  nextQuestion: (callback) => {
    socket.emit("admin:next_question", {}, callback);
  },

  onAnnouncement: (callback) => {
    socket.on("announcement:quiz_start", callback);
  },

  onQuestion: (callback) => {
    socket.on("question:new", callback);
  },

  onBuzzerLocked: (callback) => {
    socket.on("buzzer:locked", callback);
  },

  onBuzzerUnlocked: (callback) => {
    socket.on("buzzer:unlocked", callback);
  },

  onAnswerResult: (callback) => {
    socket.on("answer:result", callback);
  },

  onQuizEnded: (callback) => {
    socket.on("quiz:ended", callback);
  },

  unsubscribeAll: () => {
    socket.off("announcement:quiz_start");
    socket.off("question:new");
    socket.off("buzzer:locked");
    socket.off("buzzer:unlocked");
    socket.off("answer:result");
    socket.off("quiz:ended");
  }
};
