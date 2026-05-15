import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    // chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId,chats)
  }

  return (
    <main className='min-h-screen w-full bg-black  text-white '>
      <section className='mx-auto  flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border    md:gap-6  border-none'>
        <aside className='relative hidden h-full w-60 shrink-0  border-r  p-4 md:flex md:flex-col'>
          

          <nav className='space-y-1 mb-5'>

            <NavLink to='/' className={({ isActive }) => `w-full flex items-center gap-3 pl-2 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  : "bg-black text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            <svg role='img' className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.73486 2L11.4299 7.24715V7.24595V2.01211H12.5385V7.27063L18.2591 2V7.98253H20.6078V16.6118H18.2663V21.9389L12.5385 16.9066V21.9967H11.4299V16.9896L5.74131 22V16.6118H3.39258V7.98253H5.73486V2ZM10.5942 9.0776H4.50118V15.5167H5.73992V13.4856L10.5942 9.0776ZM6.84986 13.9715V19.5565L11.4299 15.5225V9.81146L6.84986 13.9715ZM12.5704 15.4691L17.1577 19.4994V16.6118H17.1518V13.9663L12.5704 9.80608V15.4691ZM18.2663 15.5167H19.4992V9.0776H13.4516L18.2663 13.4399V15.5167ZM17.1505 7.98253V4.51888L13.3911 7.98253H17.1505ZM10.6028 7.98253L6.84346 4.51888V7.98253H10.6028Z"></path>
            </svg>
            <span className='text-sm font-medium'>Search</span>
            </NavLink>

            <NavLink to='/chats' className={({ isActive }) => `w-full flex items-center gap-3 pl-2 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  : "bg-black text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            <svg role='img' className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
            </svg>
            <span className='text-sm font-medium'>Chats</span>
            </NavLink>

          </nav>  

          <div className='space-y-2 max-h-100 pr-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#000000] '>
            {Object.values(chats).map((chat,index) => (
              <button
                onClick={()=>{openChat(chat.id)}}
                key={index}
                type='button'
                className='w-full cursor-pointer rounded-xl border border-white/20 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
              >
                {chat.title}
              </button>
            ))}
          </div>

          <div className='absolute bottom-1  h-12 w-50  bg-zinc-600 ' >
              <h1>username</h1>
          </div>

        </aside>

        <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>

          <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'>
            {chats[ currentChatId ]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${message.role === 'user'
                    ? 'ml-auto rounded-br-none bg-white/12 text-white'
                    : 'mr-auto border-none text-white/90'
                  }`}
              >
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          <footer className='rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 '>
            <form onSubmit={handleSubmitMessage} className='flex flex-col gap-3 md:flex-row'>
              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder='Type your message...'
                className='w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90'
              />
              <button
                type='submit'
                disabled={!chatInput.trim()}
                className='rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard