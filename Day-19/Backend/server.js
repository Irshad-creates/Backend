const app = require("./src/app");
const connectToDb = require("./src/config/database");

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await connectToDb()

        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error("failed to start server", error)
        process.exit(1)
    }
}

startServer()
