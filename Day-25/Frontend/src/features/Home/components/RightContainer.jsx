import React from 'react'
import Player from "../components/Player";
import Navbar from './Navbar';
import HomeMainContainer from './HomeMainContainer';

const RightContainer = ({className}) => {

    

  return (

    <div className={className}>
      <Navbar className="navbar" />
      <HomeMainContainer className="HomeMainContainer"/>
      <Player />
    </div>
  )
}

export default RightContainer