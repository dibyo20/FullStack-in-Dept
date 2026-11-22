import { useState, useMemo, useCallback } from "react";
import DashboardStats from "./components/DashboardStats";
import StudentList from "./components/StudentList";
import "./App.css";

const initialStudents = Array.from({ length: 1000 }, (_, index) => {
  const id = index + 1;
  const departments = ["CSE", "ECE", "IT", "Mechanical", "Civil"];
  const marks = 40 + (id * 17) % 61;
  return {
    id,
    name: `Student ${id}`,
    marks,
    department: departments[id % departments.length],
    status: marks >= 50 ? "Passed" : "Failed",
  };
});

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [counter, setCounter] = useState(0);

  console.log("Dashboard (App) rendered");

  const stats = useMemo(() => {
    console.log("Calculating dashboard statistics...");
    return {
      total: students.length,
      passed: students.filter((s) => s.status === "Passed").length,
      failed: students.filter((s) => s.status === "Failed").length,
      avgMarks: Math.round(
        students.reduce((acc, curr) => acc + curr.marks, 0) / students.length
      ),
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    console.log("Filtering and sorting 1,000 student records...");
    return students
      .filter((student) => {
        const matchesSearch = student.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesDept =
          department === "All" || student.department === department;
        return matchesSearch && matchesDept;
      })
      .sort((a, b) => {
        if (sortBy === "high-to-low") return b.marks - a.marks;
        if (sortBy === "low-to-high") return a.marks - b.marks;
        return 0;
      });
  }, [students, search, department, sortBy]);

  const handleToggleStatus = useCallback((id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Passed" ? "Failed" : "Passed" }
          : s
      )
    );
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Task 5: Large Student Dashboard (1,000 Records)</h2>

        {/* Unrelated Counter */}
        <div className="counter-box">
          <span>Unrelated Dashboard Counter: <strong>{counter}</strong></span>
          <button className="btn btn-primary" onClick={() => setCounter((c) => c + 1)}>
            Increment Counter ({counter})
          </button>
        </div>

        {/* Dashboard Statistics */}
        <DashboardStats stats={stats} />

        {/* Controls: Search, Filter, Sort */}
        <div className="controls-grid">
          <div className="control-group">
            <label>Search by Name:</label>
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Filter Department:</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort by Marks:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">Default Order</option>
              <option value="high-to-low">Highest First</option>
              <option value="low-to-high">Lowest First</option>
            </select>
          </div>
        </div>

        {/* Student List */}
        <StudentList
          students={filteredStudents}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default App;
