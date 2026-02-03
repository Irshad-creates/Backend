const  mongoose  = require("mongoose");

function connectToDb (){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('mongooseDB is connected');
    })
}

module.exports = connectToDb