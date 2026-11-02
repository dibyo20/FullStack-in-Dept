const quizState = {
    status: "IDLE", // "IDLE" | "ACTIVE" | "QUESTION_ACTIVE" | "BUZZER_LOCKED" | "ENDED"
    currentQuestion: null,
    currentQuestionIndex: 0,
    totalQuestions: 0,
    buzzerWinner: null,
    buzzerLockTimer: null,
    scores: new Map()
};

module.exports = quizState;