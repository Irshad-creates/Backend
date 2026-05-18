import { useEffect } from "react";
import { initailizeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChats } from "../services/chat.api";
import {setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages } from "../chat.slice"
import { useDispatch, useSelector } from "react-redux"

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

    async function handleSendMessage ({ message, chatId }){
        try {
            dispatch(setLoading(true))
            console.log(`📤 Sending message to chatId:`, chatId, "message:", message);
            
            const data = await sendMessage( { message, chatId } )    
            const { chat, aiMessage } = data
            
            console.log(`📥 Response received:`, { chatId: chat?._id, messageId: aiMessage._id });
            
            if(!chatId) {
                console.log(`🆕 Creating new chat:`, chat._id);
                dispatch(createNewChat({
                    chatId : chat._id,
                    title : chat.title,
                }))
            }
            
            const finalChatId = chatId || chat._id;
            console.log(`💾 Adding messages to chatId:`, finalChatId);
            
            dispatch(addNewMessage({
                chatId: finalChatId,
                content : message,
                role :"user"
            }))
            dispatch(addNewMessage({
                chatId: finalChatId,
                content : aiMessage.content,
                role :"ai"
            }))
            dispatch(setCurrentChatId(finalChatId))
            dispatch(setLoading(false))
        } catch (err) {
            console.error(`❌ Error sending message:`, err.message);
            dispatch(setError(err.message))
            dispatch(setLoading(false))
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
    
    async function handleOpenChat(chatId){
        // Don't refetch if already viewing this chat
        if (currentChatId === chatId) {
            console.log(`⏭️  Already viewing chat ${chatId}, skipping refetch`);
            return;
        }

        try {
            console.log(`👀 Opening chat:`, chatId);
            dispatch(setLoading(true))
            const data = await getMessages(chatId)
            const { messages } = data

            console.log(`📨 Got messages for chat ${chatId}:`, messages.length);

            const formattedMessages = messages.map(msg =>({
                content : msg.content,
                role : msg.role,
            }))
            dispatch(addMessages({
                chatId,
                messages : formattedMessages
            }))
            dispatch(setCurrentChatId(chatId))
            console.log(`✅ Chat ${chatId} loaded, messages:`, formattedMessages.length);
            dispatch(setLoading(false))
        } catch (err) {
            console.error(`❌ Error opening chat:`, err.message);
            dispatch(setError(err.message))
            dispatch(setLoading(false))
        }
    }

    return {
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
    }
}