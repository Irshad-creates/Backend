import React from "react";

import LeftContainer from "../components/LeftContainer";
import RightContainer from "../components/RightContainer";
import "../style/HomePage.scss"

const Home = () => {

  

  return (
    <main className="mainHome">
      <LeftContainer className="leftContainer" />
      <RightContainer className="rightContainer" />
    </main>
  );
};

export default Home;
