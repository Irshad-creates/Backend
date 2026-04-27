import React from 'react'
import Profile from './Profile'

const Navbar = ({className}) => {
  return (
    <div className={className}>
        <div className="NavLeft">
            <h1>Tune Into Your Vibe</h1>
            <p>Detect your mood and jump into perfect soundtrack</p>
        </div>
        <div className="navRight">
            <button className="liveBtn">Live Session</button>
            <Profile  ></Profile>
        </div>
    </div>
  )
}

export default Navbar