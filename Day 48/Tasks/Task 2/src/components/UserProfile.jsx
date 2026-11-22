import React from "react";

// BASELINE (UNOPTIMIZED):
// This is a plain component without React.memo.
// TODO FOR YOU: Wrap this component with React.memo to avoid re-rendering when 'username' has not changed!
const UserProfile = ({ username }) => {
  console.log("UserProfile rendered with username:", username);

  return (
    <div className="user-profile-box">
      <div className="avatar">{username.charAt(0).toUpperCase()}</div>
      <div>
        <div className="user-label">Logged In User</div>
        <div className="user-name">{username}</div>
      </div>
    </div>
  );
};

export default UserProfile;
