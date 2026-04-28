import React, { useEffect, useState, useContext } from "react";
import { getSongs } from "../services/song.api";
import { SongContext } from "../song.context";
import "../style/MoodSongList.scss";

const MoodSongList = () => {
  const { song, setSong } = useContext(SongContext);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Refetch whenever the detected mood changes
  useEffect(() => {
    if (!song?.mood) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getSongs({ mood: song.mood });
        setSongs(data || []);
      } catch (err) {
        console.error("Failed to fetch mood songs:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [song?.mood]); // 👈 only re-runs when mood changes, not every song change

  if (!song?.mood) return null;

  return (
    <div className="moodSongList">
      <div className="moodSongListHeader">
        <h2>
          {song.mood === "happy" && "😄"}
          {song.mood === "sad" && "😢"}
          {song.mood === "surprised" && "😲"}
          {song.mood === "neutral" && "😐"}
          More {song.mood} songs
        </h2>
        <span className="songCount">{songs.length} songs</span>
      </div>

      {loading ? (
        <p className="loadingText">Loading...</p>
      ) : (
        <div className="songScroll">
          {songs.map((s, i) => (
            <div
              key={s._id}
              className={`moodSongRow ${song?._id === s._id ? "playing" : ""}`}
              onClick={() => setSong(s)}
            >
              <span className="idx">
                {song?._id === s._id ? "▶" : i + 1}
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