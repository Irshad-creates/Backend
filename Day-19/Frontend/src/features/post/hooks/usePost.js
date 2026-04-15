import { useContext } from "react";
import { getFeed } from "../services/post.api";
import { PostContext } from "../Post.context.jsx";


export const usePost =()=>{

    const context = useContext(PostContext)

    const {loading, post, feed, error, setLoading, setPost, setFeed, setError} = context

    const handleGetFeed = async()=>{
        setLoading(true)
        setError(null)

        try {
            const data = await getFeed()
            setFeed(data.post)
            return data.post
        } catch (error) {
            setFeed(null)
            setError(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return{loading, feed, post, error, handleGetFeed}
}
