import { createContext, useState } from "react";

export const PostContext = createContext()

export const PostContextProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState(null)
    const [error, setError] = useState(null)

    return(
        <PostContext.Provider value={ {loading, post, feed, error, setLoading, setPost, setFeed, setError} } >
            {children}
        </PostContext.Provider>
    )
}
