import React, { useState } from "react";

const App = () => {
  const [onIndex, setOnIndex] = useState(null);

  const faqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building UI.",
    },
    {
      question: "What is useState?",
      answer: "useState is a hook to manage state in functional components.",
    },
    {
      question: "What is an Accordion?",
      answer: "It is a UI where only one section is open at a time.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension that looks like HTML and is used in React.",
    },
    {
      question: "What is a component?",
      answer: "A component is a reusable piece of UI in React.",
    },
    {
      question: "What is props in React?",
      answer: "Props are inputs passed from parent to child components.",
    },
    {
      question: "What is state in React?",
      answer:
        "State is data that changes over time and controls component behavior.",
    },
    {
      question: "What is conditional rendering?",
      answer: "It means showing UI based on a condition (like if/else).",
    },
    {
      question: "Why use keys in lists?",
      answer:
        "Keys help React identify which items changed, added, or removed.",
    },
    {
      question: "What is useEffect?",
      answer:
        "useEffect is used to handle side effects like API calls or timers.",
    },
    {
      question: "What is a controlled component?",
      answer:
        "A controlled component is an input field controlled by React state.",
    },
    {
      question: "What is event handling in React?",
      answer:
        "It is the way React responds to user actions like clicks or typing.",
    },
  ];

  function handleClick(idx) {
    setOnIndex(onIndex === idx ? null : idx);
  }

  return (
    <div>
      {faqs.map((elem, idx) => (
        <div key={idx}>
          <h3 onClick={() => handleClick(idx)}>Q: {elem.question}</h3>

          {onIndex === idx && <p>Ans: {elem.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
