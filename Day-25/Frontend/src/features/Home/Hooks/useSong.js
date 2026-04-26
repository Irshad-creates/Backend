import { getSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext, defaultSong } from "../song.context";

export const useSong = ()=>{
    const  context = useContext(SongContext)

    const { loading, setLoading, song, setSong} = context || {}

    async function handleGetSong({ mood }) {
        if (!setLoading || !setSong) {
            return
        }

        setLoading(true)

        try {
            const data = await getSong({mood})
            setSong(data?.song || defaultSong)
        } catch (error) {
            console.error("Failed to fetch song:", error)
            setSong(defaultSong)
        } finally {
            setLoading(false)
        }
    }

    return(
        {loading, song,handleGetSong}
    )
}
