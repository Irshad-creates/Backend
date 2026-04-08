import { useContext } from "react";
import { getFeed } from "../services/post.api";
import { PostContext } from "../Post.context.jsx";


export const usePost =()=>{

    const context = useContext(PostContext)

    const {loading, post, feed,setLoading, setPost, setFeed} = context

    const handleGetFeed = async()=>{
        setLoading(true)    
        const data = await getFeed()

        setFeed(data.post)
        setLoading(false)
    }

    return{loading, feed, post, handleGetFeed}
}