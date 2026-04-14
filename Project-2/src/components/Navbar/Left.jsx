import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/LeftSection.scss"

const Left = () => {
  return (
    <div className='left'>
        <div className="logo">MovieMania</div>
        <div className="links">
            <Link>Movies</Link>
            <Link>TV Shows</Link>
        </div>
    </div>
  )
}

export default Left