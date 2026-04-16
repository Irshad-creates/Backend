import React from 'react'
import "./Nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {

    const navigate = useNavigate()

  return (
    <nav className='nav-bar'>
        <p>Insta</p>
        <button
        onClick={()=>{
            navigate("/createPost")
        }}
        className='button primary-button '>New post</button>
    </nav>
  )
}

export default Nav