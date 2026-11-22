import React from "react";

const StudentCard = React.memo(({ student, onToggleStatus }) => {
  console.log(`StudentCard rendered for id: ${student.id}`);

  return (
    <div className="student-card">
      <div className="student-info">
        <span className="student-name">{student.name}</span>
        <span className="student-dept">{student.department}</span>
      </div>
      <div className="student-metrics">
        <span className="student-marks">{student.marks} marks</span>
        <span className={`student-status ${student.status.toLowerCase()}`}>
          {student.status}
        </span>
        <button
          className="btn-toggle"
          onClick={() => onToggleStatus(student.id)}
        >
          Toggle Status
        </button>
      </div>
    </div>
  );
});

export default StudentCard;
