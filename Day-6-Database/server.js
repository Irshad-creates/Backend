require("dotenv").config()
const { default: mongoose } = require("mongoose");
const app = require("./src/app");

const  Mongoose  = require("mongoose");

function connectToDb (){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to database');
    })
}

connectToDb()
app.listen(3000,()=>{
    console.log('server running on port 3000');
})