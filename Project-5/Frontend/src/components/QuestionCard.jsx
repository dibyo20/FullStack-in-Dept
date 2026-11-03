import React from "react";
import "../styles/QuestionCard.scss";

const QuestionCard = ({ question, isWinner, onSelectOption }) => {
  if (!question) return null;

  return (
    <div className="question-card">
      <div className="question-card__header">
        Question {question.order} ({question.points} pts)
      </div>
      <h3 className="question-card__text">{question.questionText}</h3>

      {isWinner && (
        <div className="question-card__options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="question-card__option-btn"
              onClick={() => onSelectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
