import React,{useState, useRef} from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router' 

const CreatPost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)
    const navigate = useNavigate()

    const { loading, handleCreatePost, } = usePost()


    async function handleSubmit(e){
        e.preventDefault()
        const file = postImageInputFieldRef.current.files[0]

        handleCreatePost(file, caption)
        navigate("/")

    }

    if(loading){
        return <main>
                <h1>Creating Post...</h1>
            </main>
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}  >
                <label htmlFor="postImage" className='Postlable'> select Image </label>
                <input ref={postImageInputFieldRef} type="file" name="postImage" id="postImage" hidden/>
                <input 
                value={caption}
                onChange={(e)=>{setCaption(e.target.value)}}
                type="text" name="caption" id="caption" placeholder='Enter a caption' />
                <button className='button primary-button'>create post</button>
            </form>
        </div>

    </main>    
)
}

export default CreatPost