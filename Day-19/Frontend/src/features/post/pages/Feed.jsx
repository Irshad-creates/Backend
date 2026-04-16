import React, { useEffect } from 'react'
import "../style/feed.scss"
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../components/navBar/Nav'


const Feed = () => {

  const {feed, handleGetFeed, loading, error} = usePost()
  const navigate = useNavigate()

  useEffect(()=>{
    handleGetFeed().catch((error) => {
      if (error?.response?.status === 401) {
        navigate("/login")
      }
    })
  },[navigate])

  if(loading){
    return(<main><h1>Feed is Loading...</h1></main>)
  }

  if(error){
    return(<main><h1>Unable to load feed right now.</h1></main>)
  }

  if(!feed?.length){
    return(<main><h1>No posts in feed yet.</h1></main>)
  }

  return (
    
    <main className='feed-page'>
        <div className="feed">
          <Nav /> 
            <div className="posts">
                {feed.map(post=>{
                  return <Post key={post._id} user={post.user} post={post} />
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed
