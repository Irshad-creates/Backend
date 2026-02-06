import axios from 'axios'
import { useState, useEffect } from 'react'



function App() {
  const [notebooks, setNotebooks] = useState([])

  function fetchingdata(){
      axios.get('http://localhost:3000/api/notebooks')
      .then((res) => {
        console.log(res.data.note);
        setNotebooks(res.data.note);
      })
      .catch((err) => {
        console.error('Error fetching notebooks:', err);
      });
  }

  function submitHandler(e){
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value , description.value)

   axios.post('http://localhost:3000/api/notebooks',{
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data);

      fetchingdata()
    })
  }

  function handleDeleteNotebook (notebookId){
    console.log(notebookId)

    axios.delete('http://localhost:3000/api/notebooks/'+notebookId)
    .then(res=>{
      console.log(res.data);

      fetchingdata()
    })
  }

  useEffect(() => {
    fetchingdata()
  }, []);

  return (
    <>
    <form className='newnotebook' onSubmit={submitHandler}>
      <input  type="text" name="title" placeholder='enter title' />
      <input type="text" name="description" placeholder='enter description' />
      <button>create notebook</button>
    </form>

     <div className="notebooks">
      {
        notebooks.map((notebook,idx)=>{
          return <div className="notebook" key={idx}>
            <h1>{notebook.title}</h1>
            <p>{notebook.description}</p>
            <button onClick={()=>{handleDeleteNotebook(notebook._id)}}>Delete</button>
          </div>
        })
      }
     </div>
    </>
  )
}

export default App
