import { initailizeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChats } from "../services/chat.api";
import {setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages } from "../chat.slice"
import { useDispatch } from "react-redux"



export const useChat = ()=>{
    
    const dispatch = useDispatch()

    async function handleSendMessage ({ message, chatId }){
        dispatch(setLoading(true))
        const data =await sendMessage( { message, chatId } )    
        const { chat, aiMessage } = data
        dispatch(createNewChat({
            chatId : chat._id,
            title : chat.title,
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content : message,
            role :"user"
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content : aiMessage.content,
            role :"ai"
        }))
        dispatch(setCurrentChatId(chat._id))
        // dispatch(setLoading(false))
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
    
    async function handleOpenChat(chatId){

        const data = await getMessages(chatId)
        const  { messages } = data

        const formattedMessages = messages.map(msg =>({
            content : msg.content,
            role : msg.role,
        }))
        dispatch(addMessages({
            chatId,
            messages : formattedMessages
        }))
        dispatch(setCurrentChatId(chatId))

    }

    


    return {
        initailizeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
    }
}