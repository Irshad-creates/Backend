import React, { useEffect, useState, useContext } from "react";
import { getSongs } from "../services/song.api";
import { SongContext } from "../song.context";
import "../style/MoodSongList.scss";

const MoodSongList = () => {
  const { song, setSong, moodSongs, setMoodSongs, setIsPlaying } = useContext(SongContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!song?.mood) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getSongs({ mood: song.mood });
        setMoodSongs(data || []);
      } catch (err) {
        console.error("Failed to fetch mood songs:", err);
        setMoodSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [song?.mood, setMoodSongs]);

  if (!song?.mood) return null;

  return (
    <div className="moodSongList">
      <div className="moodSongListHeader">
        <h2>
          {song.mood === "happy" && "Happy"}
          {song.mood === "sad" && "Sad"}
          {song.mood === "surprised" && "Surprised"}
          {song.mood === "neutral" && "Neutral"}
          {" "}songs
        </h2>
        <span className="songCount">{moodSongs.length} songs</span>
      </div>

      {loading ? (
        <p className="loadingText">Loading...</p>
      ) : (
        <div className="songScroll">
          {moodSongs.map((s, i) => (
            <div
              key={s._id}
              className={`moodSongRow ${song?._id === s._id ? "playing" : ""}`}
              onClick={() => {
                setSong(s);
                setIsPlaying(true);
              }}
            >
              <span className="idx">
                {song?._id === s._id ? "Play" : i + 1}
              </span>
              <img src={s.posterUrl} alt={s.title} className="poster" />
              <div className="info">
                <p className={`title ${song?._id === s._id ? "active" : ""}`}>
                  {s.title}
                </p>
                <p className="mood">{s.mood}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSongList;
