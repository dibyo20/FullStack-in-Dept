import React from "react";
import StudentCard from "./StudentCard";

const StudentList = React.memo(({ students, onToggleStatus }) => {
  console.log(`StudentList rendered (${students.length} students)`);

  return (
    <div className="student-list">
      <div className="student-list__header">
        <span>Showing {students.length} Students</span>
      </div>
      <div className="student-list__items">
        {students.slice(0, 50).map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
      {students.length > 50 && (
        <p className="list-note">
          Displaying first 50 of {students.length} filtered students for DOM performance.
        </p>
      )}
    </div>
  );
});

export default StudentList;
