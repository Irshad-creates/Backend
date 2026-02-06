const notebookModel = require("./models/notebook.model")
const express = require('express')
const cors = require('cors')
const path =require('path')
const { log } = require("console")
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./src/public"))

app.post('/api/notebooks',  async (req, res)=>{
    const {title, description} = req.body

    const notebook = await notebookModel.create({
        title, description
    })

    res.status(200).json({
        message :"notebook created successfully",
        notebook 
    })
})

/**
 * get - /api/notebooks
 * 
 */
app.get('/api/notebooks',async (req, res)=>{
    const note =await notebookModel.find()

    res.status(200).json({
        message : "notebooks fetched successfully",
        note
    })
})

/***
 * delete - /api/noteooks/:id
 * req.params.id = delete
 */

app.delete('/api/notebooks/:id',async (req, res)=>{
    const id = req.params.id

    await notebookModel.findByIdAndDelete(id)

    res.status(200).json({
        message : "notebook deleted succsesfully"
    })
})

/**
 * patch - /api/notebooks/:id
 * 
 */
app.patch('/api/notebooks/:id',async (req, res)=>{
    const id  = req.params.id
    const { description } = req.body
    await notebookModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message : "notebook updated "
    })
})


app.use('*name',(req, res)=>{
   res.sendFile(path.join(__dirname, "./public/index.html"))
})

module.exports = app