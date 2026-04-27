import React from 'react'
import logo from "../assets/logo.png";
import { NavLink } from 'react-router'

const LeftContainer = ({className}) => {
  return (
    <div className={className}>
        <div className="leftUpper">
            <div className="leftUpperFirst">
                <img src={logo} alt="logo" />
                <h1>Moodify</h1>
            </div>
            <p>Feel it. Detect it. Play it</p>
        </div>
        <div className="leftBottom">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/playlists">Your Playlists</NavLink>
            <NavLink to="/library">Library</NavLink>
        </div>
    </div>
  )
}

export default LeftContainer
