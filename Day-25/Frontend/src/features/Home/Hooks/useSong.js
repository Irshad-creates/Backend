import { getSongs } from "../services/song.api";
import { useContext } from "react";
import { SongContext, defaultSong } from "../song.context";

const pickRandomSong = (songs, currentSongId) => {
    if (!songs?.length) return null

    const remainingSongs = songs.filter((item) => item._id !== currentSongId)
    const pool = remainingSongs.length > 0 ? remainingSongs : songs
    const randomIndex = Math.floor(Math.random() * pool.length)

    return pool[randomIndex]
}

export const useSong = () => {
    const context = useContext(SongContext)
    const {
        loading,
        setLoading,
        song,
        setSong,
        moodSongs,
        setMoodSongs,
        setIsPlaying,
    } = context || {}

    async function handleGetSong({ mood }) {
        console.log("mood received:", mood)

        if (!setLoading || !setSong || !setMoodSongs || !setIsPlaying) return

        setLoading(true)

        try {
            const songs = await getSongs({ mood })
            console.log("songs returned:", songs)
            setMoodSongs(songs || [])

            if (!songs || songs.length === 0) {
                setSong(defaultSong)
                setIsPlaying(false)
                return
            }

            const nextSong = pickRandomSong(songs, song?._id)
            setSong(nextSong)
            setIsPlaying(true)
        } catch (error) {
            console.error("Failed to fetch song:", error)
            setMoodSongs([])
            setSong(defaultSong)
            setIsPlaying(false)
        } finally {
            setLoading(false)
        }
    }

    function handleChangeMusic() {
        if (!moodSongs?.length || !setSong || !setIsPlaying) return

        const nextSong = pickRandomSong(moodSongs, song?._id)
        if (!nextSong) return

        setSong(nextSong)
        setIsPlaying(true)
    }

    return { loading, song, handleGetSong, handleChangeMusic }
}
