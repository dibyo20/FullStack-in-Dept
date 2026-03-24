import React from "react";
import rakutenLogo from "../logos/rakuten.svg";
import mondayLogo from "../logos/monday.png";
import ncrLogo from "../logos/ncr.png";
import dropboxLogo from "../logos/Dropbox.svg";
import disneyLogo from "../logos/Disney.png";
import phoneImg from "../logos/phone3.png";

const MainContent = () => {
  return (
    <div className="main">
      <div className="top">
        <div className="left">
          <div className="upper-sec">
            <span>
              <i class="fa-solid fa-chart-line icon"></i>
            </span>
            <span className="head">
              <h3>Growth</h3>
              <p>
                <strong>480%</strong> increase in Quality
              </p>
            </span>
          </div>
          <div className="middle-sec">Calls~</div>
          <div className="lower-sec">
            <div className="left-sec">
              <h2>Schedule Call</h2>
              <p>
                Connect, collaborate and get more done together video meetings.
              </p>
              <a href="/">
                Get started<span>↗</span>
              </a>
            </div>
            <div className="right-sec">
              <h2>Join a Meeting</h2>
              <p>You can join an online meeting through an email invite.</p>
              <a href="/">
                Get started<span>↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="left-half">
            <div className="top-sec">
              <h1>98%</h1>
              <span>Successful Call </span>
              <span>Rates.</span>
            </div>
            <div className="bottom-sec">
              <div className="phoneDiv">
                <img src={phoneImg}></img>
              </div>
            </div>
          </div>
          <div className="right-half">
            <div className="badge">
              <div className="badge2">
                <i class="fa-solid fa-fingerprint"></i>
              </div>
            </div>
            <div className="bottom-part">
              <h1>3M</h1>
              <span>Active Registered</span>
              <span>Users.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="empty"></div>

      <div className="lower">
        <img src={rakutenLogo} className="logo1"></img>
        <img src={ncrLogo} className="logo3"></img>
        <img src={mondayLogo} className="logo2"></img>
        <img src={disneyLogo} className="logo5"></img>
        <img src={dropboxLogo} className="logo4"></img>
      </div>
    </div>
  );
};

export default MainContent;
