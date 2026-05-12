import { generateResponse, generateChatTitle } from "../services/ai.service.js ";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
    
    const { message, chat : chatId } = req.body
    let title = null
    let chat = null
    let activeChatId = chatId

    if(!activeChatId){
        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user : req.user.id,
            title
        })
        activeChatId = chat._id
    } 
    
    const userMessage = await messageModel.create({
        chat : activeChatId,
        content : message,
        role :"user"
    })
    
    const messages = await messageModel.find({ chat : activeChatId })
    const result = await generateResponse(messages)
    
    const aiMessage = await messageModel.create({
        chat :activeChatId,
        content : result,
        role :"ai"
    })
    
    console.log(messages);
    
    res.status(201).json({
        title,
        chat,
        aiMessage 
    })
}

export async function getChats(req, res){
    const user = req.user

    const chats =  await chatModel.find({ user : user.id })

    res.status(201).json({
        message :"chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res){
    const { chatId } = req.params

    const chat =  await chatModel.findOne({
        _id : chatId,
        user : req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message:"Chat not found"
        })
    }
    const messages = await messageModel.find({chat : chatId})
    res.status(201).json({
        message: "message feteched successfully",
        messages
    }) 
}


export async function deleteChat(req, res){
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id : chatId,
        user : req.user.id
    })

    await messageModel.deleteMany({
        chat : chatId
    })

    if(!chat){
        return res.status(404).json({
            message : "Chat not found"
        })
    }

    res.status(200).json({
        message : "Chat deleted successfully"
    })
}
