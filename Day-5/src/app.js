const express = require('express')

const app = express()
app.use(express.json())

const note = []

app.post('/note',(req, res)=>{
    note.push(req.body)

    res.status(201).json({
        message : "note created succusfully"
    })
}) 

app.get("/note", (req, res)=>{
    res.status(200).json({
        notes : note
    })
})


//delete
app.delete('/note/:index', (req, res)=>{
    delete note[req.params.index]

    res.status(204).json({
        message : "note deleted Successfully"
    })
})

// patch 

app.patch('/note/:index',(req, res)=>{
    note[req.params.index].title = req.body.title
    res.status(200).json({
        message : "updated succesfully"
    })  
})

module.exports = app