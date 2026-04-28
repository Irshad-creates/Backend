import React from 'react'
import { useSong } from "../Hooks/useSong"
import FaceExpression from "../../Expresssion/components/FaceExpression";

import { useContext } from "react";
import { SongContext } from "../song.context";
import MoodSongList from './MoodSongList';


const HomeMainContainer = ({className}) => {

    const {handleGetSong} = useSong()
    const { song } = useContext(SongContext);

  return (
    <div className={className}>
        <div className="camera-song">
            <div className="face-camera">
                <h1>Face Camera</h1>
                <FaceExpression onClick={(expression)=>{handleGetSong({ mood:expression })}}/>
            </div>
            <div className="current-song">
                <h1>Now Ready</h1>
                
                {song && (
                    <div className="song-card">
                        <img src={song.posterUrl} alt={song.title} />

                        <h2>{song.title}</h2>
                        <p>{song.artist}</p>
                        <span>Detected Mood : {song.mood}</span>
                    </div>
                )}
                <button className='changeMusic'>Change music</button>
            </div>
        </div>
        <MoodSongList />
    </div>    
        
    
  )
}

export default HomeMainContainer