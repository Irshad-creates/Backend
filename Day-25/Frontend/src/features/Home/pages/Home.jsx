import React from "react";
import FaceExpression from "../../Expresssion/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../Hooks/useSong";

const Home = () => {

  const {handleGetSong} = useSong()

  return (
    <>
      <FaceExpression 
      onClick={(expression)=>{handleGetSong({ mood:expression })}}
      />
      <Player />
    </>
  );
};

export default Home;
