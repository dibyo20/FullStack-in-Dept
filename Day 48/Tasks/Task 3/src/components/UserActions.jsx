import React from "react";

const UserActions = React.memo(({ username, updateUsername }) => {
  console.log("UserActions child rendered! (Props checked)");

  return (
    <div className="actions-card">
      <div className="current-user">
        <span className="actions-label">Current User:</span>
        <span className="actions-name">{username}</span>
      </div>
      <button className="btn btn-secondary" onClick={updateUsername}>
        Update Username (Child Button)
      </button>
    </div>
  );
});

export default UserActions;
