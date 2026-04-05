const path = require("path")
const mongoose = require('mongoose')
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") })

async function connectToDb(){
   await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database")
    })
}

module.exports = connectToDb
