import React from "react";
import { Outlet } from "react-router"
import LeftContainer from "../components/LeftContainer";
import RightContainer from "../components/RightContainer";
import "../style/HomePage.scss"
import Player from "../components/Player";

const Home = () => {

  

  return (
    <main className="mainHome">
      <LeftContainer className="leftContainer" />
      {/* <RightContainer className="rightContainer" /> */}
      <div className="rightContainer">
        <Outlet />  {/* 👈 this is where Playlists/Library/HomeMain renders */}
      </div>
      <Player />
    </main>
  );
};

export default Home;
