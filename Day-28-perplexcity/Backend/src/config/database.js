import mongoose from 'mongoose'

import dotenv from "dotenv"
dotenv.config()

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err) => {
        console.log("Error while connecting to DB", err);
    });
}

export default connectToDb