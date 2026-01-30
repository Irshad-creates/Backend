/*
app is used to create server and config the server
*/


const express = require('express') // server create ho gaya

const app = express() // server ka instance create ho gya
app.use(express.json()) // res.body ko server read kr payega 

const notes =[]

//post APi
app.post('/notes',(req, res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send('notes created')
    console.log(notes);
})

app.get('/notes',(req, res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req, res)=>{
    delete notes [ req.params.index ];

    res.send('notes delete succefully')
})

app.patch('/notes/:index',(req, res)=>{
    notes[req.params.index].description = req.body.description

    res.send("note updated successfully")
})
module.exports = app
