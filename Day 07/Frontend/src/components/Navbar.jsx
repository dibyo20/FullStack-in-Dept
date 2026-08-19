import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="first">
        <div className="semi-circle"></div>
        <span><b>/</b> Sales@meetinghub.io</span>
      </div>
      <div className="middle">
        <span>Video Call</span>
        <span>.</span>
        <span>Meetings</span>
        <span>.</span>
        <span>Conferences</span>
        <span>.</span>
        <span>Integration</span>
      </div>
      <div className="last">
        <span>Login</span>
        <div className="phone">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div className="start-btn">Get Started - It's Free</div>
      </div>
    </div>
  );
};

export default Navbar;
