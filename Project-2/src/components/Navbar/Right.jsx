import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/RightSection.scss"

const Right = () => {
  return (
    <div className='right'>
        <button>Theme</button>
        <Link>Sign In</Link>
    </div>
  )
}

export default Right