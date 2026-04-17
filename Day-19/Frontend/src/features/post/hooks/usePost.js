import { useContext,useEffect } from "react";
import { createPost, getFeed } from "../services/post.api";
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


    const handleCreatePost = async(imageFile, caption)=>{
        setLoading(true)
        setError(null)

        try {
            const data = await createPost(imageFile, caption)
            setFeed((currentFeed)=>[data.post, ...(currentFeed || [])])
            return data.post
        } catch (error) {
            setError(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{handleGetFeed},[])

    return{loading, feed, post, error, handleGetFeed, handleCreatePost}
}
