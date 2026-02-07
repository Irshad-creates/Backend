/**
 * create instance of server and making of apis
 * call model and create apis with those models
 */
const path = require('path')
const express = require('express')
const notesModel = require('./models/notes.model')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./src/public"))
/**
 * post - /api/notes
 * 
 */
app.post('/api/notes',async(req, res)=>{
    const {title , description} = req.body

    const note =await notesModel.create({
        title , description
    })

    res.status(200).json({
        messsage : "note created succesfully",
        note
    })
})

/***
 * GET - /api/notes
 * fetch the data from the data base 
 */
app.get('/api/notes',async(req, res)=>{
    
    const note = await notesModel.find()
    
    res.status(200).json({
        message : "notes feteched succesfully",
        note
    })
})

/**
 * patch - /api/notes/:id -to update description 
 * id = req.params.id
 */
app.patch('/api/notes/:id',async(req, res)=>{
    const id  = req.params.id
    const {description} = req.body
    await notesModel.findByIdAndUpdate(id,  { description} )
    
    res.status(200).json({
        message : "note updated succesfully"
    })
})

/**
 * delete - /api/notes/:id
 * note = req.params.id
 */
app.delete('/api/notes/:id',async (req, res)=>{
    const id = req.params.id

    const note =await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message : "successfully delete note"
    })
})

// app.use('*',(req, res)=>{
//     res.sendFile()
// })

app.use('*name',(req, res)=>{
   res.sendFile(path.join(__dirname, "./public/index.html"))
})


module.exports =app