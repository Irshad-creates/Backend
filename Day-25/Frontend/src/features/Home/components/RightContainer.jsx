import React from 'react'
import Navbar from './Navbar';
import HomeMainContainer from './HomeMainContainer';

const RightContainer = ({className}) => {

    

  return (

    <div className={className}>
      <Navbar className="navbar" />
      <HomeMainContainer className="HomeMainContainer"/>
    </div>
  )
}

export default RightContainer