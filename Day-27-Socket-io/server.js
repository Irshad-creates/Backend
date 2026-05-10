import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    
    console.log('new connection created');

    socket.on("message", (msg)=>{
        console.log('user fired a message event');
        console.log(msg);
        io.emit("abc", msg)
    })
})

httpServer.listen(3000,()=>{

    console.log('server running on port 3000');
});