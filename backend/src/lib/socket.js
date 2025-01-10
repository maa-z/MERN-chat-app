import {Server} from "socket.io";
import http from "http"
import express from "express"


const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"]
    },
});

//for real time message seen from user  id it will give socket id
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {} ; // {userId,socketId};

io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) {
        userSocketMap[userId] = socket.id;
    }

    // emit broadcast event to all connected client
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  
    socket.on("disconnect", () => {
    //   console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
       // emit broadcast event to all connected client
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
  });
  
  export { io, app, server };
  