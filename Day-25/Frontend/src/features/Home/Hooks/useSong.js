import { getSongs } from "../services/song.api";
import { useContext } from "react";
import { SongContext, defaultSong } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong } = context || {}

    async function handleGetSong({ mood }) {
        console.log("mood received:", mood) 


        if (!setLoading || !setSong) return

        setLoading(true)

        try {
            const songs = await getSongs({ mood })  // now an array
                console.log("songs returned:", songs) 
            if (!songs || songs.length === 0) {
                setSong(defaultSong)
                return
            }

            // Pick a random song from the matched mood songs
            const randomIndex = Math.floor(Math.random() * songs.length)
            setSong(songs[randomIndex])

        } catch (error) {
            console.error("Failed to fetch song:", error)
            setSong(defaultSong)
        } finally {
            setLoading(false)
        }
    }

    return { loading, song, handleGetSong }
}