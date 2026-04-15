import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/LeftSection.scss"

const Left = () => {
  return (
    <div className='left'>
        <div className="logo">CineLens</div>
        <div className="links">
            <Link className='nav-items active'>Movies</Link>
            <Link className='nav-items'>TV Shows</Link>
        </div> 
    </div>
  ) 
}

export default Left