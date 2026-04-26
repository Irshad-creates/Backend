import React, { useContext, useEffect, useRef, useState } from "react";
import { SongContext, defaultSong } from "../song.context";

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

const formatTime = (timeInSeconds) => {
  if (!Number.isFinite(timeInSeconds)) {
    return "0:00";
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const Player = () => {
  const audioRef = useRef(null);
  const {
    song,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    playbackRate,
    setPlaybackRate,
  } = useContext(SongContext);
  const [volume, setVolume] = useState(0.8);
  const activeSong = song || defaultSong;

  const barStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    background: "#111111",
    color: "#ffffff",
    borderTop: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.25)",
  };

  const contentStyle = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) auto",
    gap: "1rem",
    alignItems: "center",
    padding: "0.9rem 1rem 1rem",
  };

  const buttonStyle = {
    border: "none",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
  };

  const iconButtonStyle = {
    ...buttonStyle,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    padding: 0,
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  };

  const primaryButtonStyle = {
    ...iconButtonStyle,
    width: "56px",
    height: "56px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #4ade80, #22c55e)",
    color: "#08110c",
    boxShadow: "0 10px 24px rgba(34, 197, 94, 0.35)",
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [activeSong.url, isPlaying, setCurrentTime, setDuration, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });
      return;
    }

    audio.pause();
  }, [isPlaying, setIsPlaying]);

  const togglePlayback = () => {
    setIsPlaying((previous) => !previous);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSkip = (seconds) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration || audio.duration || 0
    );

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSpeedChange = (event) => {
    setPlaybackRate(Number(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(Number(event.target.value));
  };

  const syncDuration = (audio) => {
    const nextDuration = audio.duration;

    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration(nextDuration);
    }
  };

  const progressPercentage =
    duration > 0 ? `${Math.min((currentTime / duration) * 100, 100)}%` : "0%";

  const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.75c0-1 1.08-1.63 1.96-1.13l8 4.63c.88.5.88 1.76 0 2.26l-8 4.63A1.3 1.3 0 0 1 6 13.99V4.75Z" />
    </svg>
  );

  const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.5 4.5A1.5 1.5 0 0 1 7 6v8a1.5 1.5 0 0 1-3 0V6a1.5 1.5 0 0 1 1.5-1.5Zm7 0A1.5 1.5 0 0 1 14 6v8a1.5 1.5 0 0 1-3 0V6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );

  const BackwardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.7 10 16 5.63v8.74L9.7 10Zm-6.2 0 6.3-4.37v8.74L3.5 10Zm-.5-4.75h1.5v9.5H3V5.25Z" />
    </svg>
  );

  const ForwardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10.3 10 4 14.37V5.63L10.3 10Zm6.2 0-6.3 4.37V5.63L16.5 10Zm.5 4.75h-1.5v-9.5H17v9.5Z" />
    </svg>
  );

  const VolumeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.14 4.28a1 1 0 0 1 1.72.69v10.06a1 1 0 0 1-1.72.69L5.9 12.5H3.5A1.5 1.5 0 0 1 2 11V9a1.5 1.5 0 0 1 1.5-1.5h2.4l3.24-3.22ZM13.6 7.02a.75.75 0 0 1 1.06.06 4.5 4.5 0 0 1 0 5.84.75.75 0 1 1-1.12-.99 3 3 0 0 0 0-3.86.75.75 0 0 1 .06-1.05Zm2.52-2.28a.75.75 0 0 1 1.06.06 8 8 0 0 1 0 10.4.75.75 0 1 1-1.12-.99 6.5 6.5 0 0 0 0-8.42.75.75 0 0 1 .06-1.05Z" />
    </svg>
  );

  return (
    <section style={barStyle}>
      <audio
        ref={audioRef}
        src={activeSong.url}
        onLoadedMetadata={(event) => {
          syncDuration(event.currentTarget);
        }}
        onLoadedData={(event) => {
          syncDuration(event.currentTarget);
        }}
        onDurationChange={(event) => {
          syncDuration(event.currentTarget);
        }}
        onTimeUpdate={(event) => {
          syncDuration(event.currentTarget);
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div style={{ padding: "0.5rem 1rem 0" }}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeek}
          style={{
            width: "100%",
            accentColor: "#4ade80",
            cursor: "pointer",
            margin: 0,
            height: "6px",
            borderRadius: "999px",
            background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${progressPercentage}, rgba(255, 255, 255, 0.16) ${progressPercentage}, rgba(255, 255, 255, 0.16) 100%)`,
          }}
        />
      </div>

      <div style={contentStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            minWidth: 0,
          }}
        >
          <img
            src={activeSong.posterUrl}
            alt={activeSong.title}
            style={{
              width: "56px",
              height: "56px",
              objectFit: "cover",
              borderRadius: "10px",
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeSong.title}
            </p>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.7)",
                textTransform: "capitalize",
              }}
            >
              {activeSong.mood}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => handleSkip(-5)}
            style={iconButtonStyle}
            aria-label="Go backward 5 seconds"
            title="Back 5 seconds"
          >
            <BackwardIcon />
          </button>

          <button
            type="button"
            onClick={togglePlayback}
            style={primaryButtonStyle}
            aria-label={isPlaying ? "Pause song" : "Play song"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            type="button"
            onClick={() => handleSkip(5)}
            style={iconButtonStyle}
            aria-label="Go forward 5 seconds"
            title="Forward 5 seconds"
          >
            <ForwardIcon />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem",
            justifySelf: "end",
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.75)",
            whiteSpace: "nowrap",
          }}
        >
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.45rem 0.7rem",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <VolumeIcon />
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                style={{
                  width: "78px",
                  accentColor: "#4ade80",
                  cursor: "pointer",
                  height: "4px",
                  borderRadius: "999px",
                  background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${volume * 100}%, rgba(255, 255, 255, 0.16) ${volume * 100}%, rgba(255, 255, 255, 0.16) 100%)`,
                }}
              />
            </div>
          </div>
          <select
            value={playbackRate}
            onChange={handleSpeedChange}
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              background: "#0a0a0a",
              color: "#6dc568",
              padding: "0.5rem 0.8rem",
              outline: "none",
              fontSize: "0.85rem",
            }}
            aria-label="Playback speed"
          >
            {SPEED_OPTIONS.map((speed) => (
              <option key={speed} value={speed} style={{ color: "#6dc568" }}>
                x{speed}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default Player;
