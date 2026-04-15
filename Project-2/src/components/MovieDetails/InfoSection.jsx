import React from 'react'
import "../../styles/InfoSection.scss"

const InfoSection = () => {
  return (
    <div className="info-section">
      <h2>Movie Overview</h2>

      <p>
        A South Korean agent hunts a drug ring in Russia and goes head-to-head
        with a North Korean operative — pulling both into peril and tangled
        secrets.
      </p>

      <div className="meta-grid">
        <div className="meta-item">
          <span className="head">RATING</span>
          <strong>⭐ 7.3</strong>
        </div>

        <div className="meta-item">
          <span className="head">RELEASE</span>
          <strong>2026</strong>
        </div>

        <div className="meta-item">
          <span className="head">LANGUAGE</span>
          <strong>KO</strong>
        </div>

        <div className="meta-item">
          <span className="head">RUNTIME</span>
          <strong>2h 15m</strong>
        </div>

        <div className="meta-item">
          <span className="head">GENRE</span>
          <strong>Action, Thriller</strong>
        </div>

        <div className="meta-item">
          <span className="head">DIRECTOR</span>
          <strong>Kim Sung-hoon</strong>
        </div>
      </div>
    </div>
  )
}

export default InfoSection