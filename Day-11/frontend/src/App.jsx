import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  const [notes, setNotes] = useState([])

  /**
   * fetching data with axios.get
   */
  function fetchingData(){
    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      console.log(res.data.note)
      setNotes(res.data.note)
    })
    .catch((err)=>{
      console.error('Error fetching note',err)
    })
  }

  /**
   * handling submit 
   * preventing default> and posting data to database > fetching data again
   * dwheid
   */
  function submitHandler(e){
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value, description.value);
    
    axios.post('http://localhost:3000/api/notes',{
      title: title.value,
      description: description.value
    })
    .then((res)=>{
      console.log(res.data.note)
      
      fetchingData()
    })
  }

  function deleteHandler(noteId){
    axios.delete('http://localhost:3000/api/notes/'+ noteId)
    .then(res=>{
      console.log(res.data)

      fetchingData()
    })
  }
  useEffect(()=>{
    fetchingData()
  },[])
  return (
    <>
      <form className='newnote' onSubmit={submitHandler}>
        <input type="text" name='title' placeholder='enter title' />
        <input type="text" name='description' placeholder='enter Description' />
        <button>create note</button>
      </form>



    <div className="notes">
      {
        notes.map((note, idx)=>{
        return <div className="note" key={idx}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{deleteHandler(note._id)}} >Delete</button>
        </div>
        })
      }
    </div>
    </>
  )
}

export default App
