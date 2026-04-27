import React, { useState, useEffect } from "react";
import { getSongs } from "../../Home/services/song.api";
import { useContext } from "react";
import { SongContext } from "../../Home/song.context";
import "../style/Playlist.jsx"

const MOODS = ["happy", "sad", "surprised", "neutral"];

const Playlists = () => {
  const [activeMood, setActiveMood] = useState("happy");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { song, setSong } = useContext(SongContext);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getSongs({ mood: activeMood });
        setSongs(data || []);
      } catch (err) {
        console.error("Failed to fetch songs:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [activeMood]);

  return (
    <div className="playlistsPage">
      <div className="playlistsHeader">
        <h1>Your Playlists</h1>
        <p>Browse songs by mood</p>
      </div>

      <div className="moodTabs">
        {MOODS.map((mood) => (
          <button
            key={mood}
            className={`moodTab ${activeMood === mood ? "active" : ""} ${mood}`}
            onClick={() => setActiveMood(mood)}
          >
            {mood === "happy" && "😄"}
            {mood === "sad" && "😢"}
            {mood === "surprised" && "😲"}
            {mood === "neutral" && "😐"}
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>

      <div className="songList">
        {loading ? (
          <div className="loadingState">Fetching {activeMood} songs...</div>
        ) : songs.length === 0 ? (
          <div className="emptyState">No songs found for this mood yet.</div>
        ) : (
          songs.map((s, i) => (
            <div
              key={s._id}
              className={`songRow ${song?._id === s._id ? "playing" : ""}`}
              onClick={() => setSong(s)}
            >
              <span className="songIndex">
                {song?._id === s._id ? "▶" : i + 1}
              </span>
              <img src={s.posterUrl} alt={s.title} className="songPoster" />
              <div className="songInfo">
                <h3 className={song?._id === s._id ? "active" : ""}>{s.title}</h3>
                <p>{s.mood}</p>
              </div>
              {song?._id === s._id && (
                <span className="nowPlayingBadge">Now Playing</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlists;
