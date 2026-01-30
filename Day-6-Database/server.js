const { default: mongoose } = require("mongoose");
const app = require("./src/app");

const  Mongoose  = require("mongoose");

function connectToDb (){
    mongoose.connect("mongodb+srv://irshad:JEljue3v5W4Rp6pv@cohort02.atjw7n9.mongodb.net/day-6")
    .then(()=>{
        console.log('Connected to database');
    })
}

connectToDb()
app.listen(3000,()=>{
    console.log('server running on port 3000');
})