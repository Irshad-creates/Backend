import app from "./src/app.js";
import connectToDb from "./src/config/database.js";
import http from "http"
import { initSocket } from "./src/Sockets/server.socket.js";

const httpServer = http.createServer(app)
initSocket(httpServer)







connectToDb()
httpServer.listen(3000,()=>{
    console.log("server is running on port 3000");
})