import React from "react";

const DashboardStats = React.memo(({ stats }) => {
  console.log("DashboardStats rendered");

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total Students</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Passed</span>
        <span className="stat-value success">{stats.passed}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Failed</span>
        <span className="stat-value danger">{stats.failed}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Average Marks</span>
        <span className="stat-value highlight">{stats.avgMarks}</span>
      </div>
    </div>
  );
});

export default DashboardStats;
