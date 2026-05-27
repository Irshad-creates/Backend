import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'
import remarkGfm from 'remark-gfm'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../auth/Hooks/useAuth.js'

import Sidebar from '../components/Sidebar.jsx'
import AppLayout from "../components/AppLayout"
import ChatMessages from "../components/ChatMessages"
import ChatInput from "../components/ChatInput"



const ChatPage = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const isGenerating = useSelector((state) => state.chat.isGenerating)

  const { handleLogout } = useAuth()

  useEffect(() => {
    // Don't refetch chats if we already have them
    if (Object.keys(chats).length === 0) {
      chat.handleGetChats()
    }
  }, [])
  
  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    console.log(`📝 ChatPage: Sending message to currentChatId:`, currentChatId);
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  return (
    <AppLayout chats={chats}
    openChat={openChat}
    handleLogout={handleLogout}
    >

      <section className='w-full min-w-0 flex flex-1 overflow-hidden'>

          <div className='mx-auto flex h-full w-full max-w-4xl flex-col px-4 py-4'>

              <ChatMessages
                  chats={chats}
                  currentChatId={currentChatId}
                  isGenerating={isGenerating}
              />

              <ChatInput
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  handleSubmitMessage={handleSubmitMessage}
              />

          </div>

      </section>
    </AppLayout>    
  )
}

export default ChatPage
