
import axios from 'axios'


function App() {
  const [notes, setNotes] = useState([])

    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        console.log(res.data.notes);
        setNotes(res.data.note);
      })
      


  return (
    
    <div className="notes">
      {
        notes.map((note, idx) =>{
          return <div className="note" key={idx}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        })
      }

    </div>
    
  )
}

export default App
