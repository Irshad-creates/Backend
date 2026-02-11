const app = require('./src/app')
const connectToDb = require("./src/config/databse")
require('dotenv').config()



connectToDb()


app.listen(3000,()=>{
    console.log('server is runnig on port 3000');
})