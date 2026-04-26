import { createContext, useState } from "react";

export const SongContext = createContext(null);

export const defaultSong = {
  url: "https://ik.imagekit.io/irshadAssets/cohort2/Moodify/songs/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__RIMrtpz2X",
  posterUrl:
    "https://ik.imagekit.io/irshadAssets/cohort2/Moodify/posters/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__H34JH1Twi.jpeg",
  title: 'Aakhir Tumhein Aana Hai (From "From Your Humsafar") [DOWNLOAD MING]',
  mood: "sad",
};

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(defaultSong);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  return (
    <SongContext.Provider
      value={{
        loading,
        setLoading,
        song,
        setSong,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        playbackRate,
        setPlaybackRate,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
