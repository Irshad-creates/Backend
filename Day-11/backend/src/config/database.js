/**
 * connect to mongoDB
 * exprot the function to initalise in the server.js
 */

require('dotenv').config()
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to Database');
        
    })
}
module.exports = connectToDb