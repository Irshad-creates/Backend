const app = require("./src/app");
const connectToDb = require("./src/config/databse");

connectToDb()
app.listen(3000,()=>{
    console.log("server is runing on port 3000")
}) 