const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
app.use(express.json())



app.post('/api/notes',async (req, res)=>{
    const {title, description} = req.body
    
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message : "post created successfully",
        note
    })
})

app.get('/api/notes', async(req, res)=>{
    const note =await noteModel.find()

    res.status(200).json({
        message : "data feteched succesfully",
        note
    })
})

/**
 * delete - '/api/notes/:id
 * -delete note with id from req.params
 */
app.delete('/api/notes/:id', async (req, res)=>{
    const id= req.params.id
    
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message :"note deleted succesfully"
    })
    
})

/**
 * patch - /api/notes/:id
 * update the description of the note by Id
 * {req.body} = description
 */

app.patch('/api/notes/:id',async (req, res)=>{
    const id = req.params.id
    const {description}= req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message : "note updated successfully"
    })
})

module.exports = app