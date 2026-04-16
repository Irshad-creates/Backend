import React,{useState, useRef} from 'react'

const CreatPost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)

    function handleSubmit(e){
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]
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