import React, { useState, useEffect } from "react";
import { getAllSongs } from "../../Home/services/song.api";
import { useContext } from "react";
import { SongContext } from "../../Home/song.context";
import "../style/Library.scss";

const MOOD_FILTERS = ["all", "happy", "sad", "surprised", "neutral"];

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { song, setSong } = useContext(SongContext);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getAllSongs();
        setSongs(data || []);
      } catch (err) {
        console.error("Failed to fetch library:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = songs.filter((s) => {
    const matchesMood = filter === "all" || s.mood === filter;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchesMood && matchesSearch;
  });

  return (
    <div className="libraryPage">
      <div className="libraryHeader">
        <div>
          <h1>Library</h1>
          <p>{songs.length} songs in your collection</p>
        </div>
        <input
          type="text"
          placeholder="Search songs..."
          className="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filterTabs">
        {MOOD_FILTERS.map((f) => (
          <button
            key={f}
            className={`filterTab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="libraryGrid">
        {loading ? (
          <div className="loadingState">Loading your library...</div>
        ) : filtered.length === 0 ? (
          <div className="emptyState">No songs found.</div>
        ) : (
          filtered.map((s, i) => (
            <div
              key={s._id}
              className={`libraryCard ${song?._id === s._id ? "playing" : ""}`}
              onClick={() => setSong(s)}
            >
              <div className="cardPosterWrap">
                <img src={s.posterUrl} alt={s.title} className="cardPoster" />
                {song?._id === s._id && (
                  <div className="playingOverlay">▶</div>
                )}
              </div>
              <div className="cardInfo">
                <h3 className={song?._id === s._id ? "active" : ""}>{s.title}</h3>
                <span className={`moodTag ${s.mood}`}>{s.mood}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
