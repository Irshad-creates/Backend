import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// Returns an array of songs matching the mood
export async function getSongs({ mood }) {
    const response = await api.get("/api/songs", {
        params: { mood }
    })
    return response.data.songs  // array, not a single object
}


export async function getAllSongs(){
    const response = await api.get("/api/songs/all")
    return response.data.songs
}