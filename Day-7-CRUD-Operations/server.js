require("dotenv").config()
const mongoose = require('mongoose')
const app = require("./src/app");
const connectToDb = require('./src/config/database');
const noteModel = require('./src/models/notes.model');

connectToDb()


app.listen(3000,()=>{
    console.log('server running on port 3000');
})