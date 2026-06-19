import React from 'react'
import logoImage from '../assets/logo_blogforge.jpg'
function Logo({width='100px'}) {
  return (
    <div>
      <img src={logoImage} alt="blogForge Logo" style={{ width: width }} />
    </div>
  )
}

export default Logo
