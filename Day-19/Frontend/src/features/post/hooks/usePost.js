import { useContext } from "react";
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
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

    const handleLike = async(postId)=>{
        try {
            await likePost(postId)
            setFeed((currentFeed) =>
                (currentFeed || []).map((item) =>
                    item._id === postId ? { ...item, isLiked: true } : item
                )
            )
        } catch (error) {
            setError(error)
            throw error
        }
    }
    
    const handleUnlike = async(postId)=>{
        try {
            await unlikePost(postId)
            setFeed((currentFeed) =>
                (currentFeed || []).map((item) =>
                    item._id === postId ? { ...item, isLiked: false } : item
                )
            )
        } catch (error) {
            setError(error)
            throw error
        }
    }

    return{loading, feed, post, error, handleGetFeed, handleCreatePost, handleLike, handleUnlike}
}
