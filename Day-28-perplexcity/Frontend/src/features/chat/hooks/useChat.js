import { useEffect } from "react";
import { initailizeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChats } from "../services/chat.api";
import {setChats, setCurrentChatId, setLoading, setError, createNewChat , updateChatTitle , addNewMessage, addMessages , setGenerating, appendToMessage } from "../chat.slice"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast";

let socketInitialized = false;

export const useChat = ()=>{
    
    const dispatch = useDispatch()
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    // Initialize socket only once
    useEffect(() => {
        if (!socketInitialized) {
            initailizeSocketConnection(dispatch, addNewMessage);
            socketInitialized = true;
        }
    }, [dispatch])

    async function handleSendMessage({ message, chatId }) {

        try {

            dispatch(setGenerating(true))

            let finalChatId = chatId

            // Existing chats ke liye instant user message
            if (chatId) {

                dispatch(addNewMessage({
                    chatId: finalChatId,
                    content: message,
                    role: "user"
                }))
            }

            const data = await sendMessage({ message, chatId })

            const { chat: newChat, aiMessage } = data

            

            finalChatId = chatId || newChat._id


            // New chat create
            if (!chatId) {

                dispatch(createNewChat({
                    chatId: finalChatId,
                    title: "Generating..."
                }))

                dispatch(setCurrentChatId(finalChatId))

                // New chat user message
                dispatch(addNewMessage({
                    chatId: finalChatId,
                    content: message,
                    role: "user"
                }))
            }

            // Empty AI message
            dispatch(addNewMessage({
                chatId: finalChatId,
                content: "",
                role: "ai"
            }))

            // Streaming effect
            const words = aiMessage.content.split(" ")

            for (const word of words) {

                dispatch(appendToMessage({
                    chatId: finalChatId,
                    content: word + " "
                }))

                await new Promise(resolve =>
                    setTimeout(resolve, 30)
                )
            }

            // Update title
            dispatch(updateChatTitle({
                chatId: finalChatId,
                title: newChat.title
            }))

            dispatch(setGenerating(false))

        } catch (err) {

            console.error(`❌ Error sending message:`, err.message);

            dispatch(setError(err.message))

            dispatch(setGenerating(false))
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat)=>{
            acc[ chat._id]={
                id :chat._id,
                title : chat.title,
                messages : [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        },{})))
        dispatch(setLoading(false))
    }
    
    async function handleOpenChat(chatId, chats){
        // Don't refetch if already viewing this chat
        if (currentChatId === chatId) {
            return;
        }

        try {
            dispatch(setLoading(true))
            
            if(chats[ chatId ]?.messages.length === 0){

                const data = await getMessages(chatId)
                const { messages } = data
                
                
                const formattedMessages = messages.map(msg =>({
                    content : msg.content,
                    role : msg.role,
                }))
                dispatch(addMessages({
                    chatId,
                    messages : formattedMessages
                }))
            }
            dispatch(setCurrentChatId(chatId))
            dispatch(setLoading(false))
        } catch (err) {
            console.error(`❌ Error opening chat:`, err.message);
            dispatch(setError(err.message))
            dispatch(setLoading(false))
        }
    }

    async function handleDeleteChat(chatId) {
        try {
            await deleteChats(chatId)
            dispatch(removeChat(chatId))
            toast.success("Chat deleted");
        } catch (err) {
            toast.error("Failed to delete chat");
        }
    }

    return {
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat
    }
}