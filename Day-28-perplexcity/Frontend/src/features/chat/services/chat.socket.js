import { io } from "socket.io-client";

let socket = null;

export const initailizeSocketConnection = (dispatch, addMessageAction) => {
    // Only create socket once
    if (socket && socket.connected) {
        return socket;
    }

    socket = io("http://localhost:3000", {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Connected to Socket.io server");
    });

    // Listen for AI responses
    socket.on("aiMessage", (data) => {
        console.log("Received AI message:", data);
        dispatch(addMessageAction({
            chatId: data.chatId,
            content: data.content,
            role: "ai"
        }));
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from Socket.io server");
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });

    return socket;
};

export const getSocket = () => socket;
