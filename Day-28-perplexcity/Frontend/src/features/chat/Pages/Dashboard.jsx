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
        <aside className='relative hidden h-full w-60 shrink-0  border-r border-zinc-700 p-4 md:flex md:flex-col'>
          

          <nav className='space-y-1 mb-4'>

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

            <NavLink to='/Email' className={({ isActive }) => `w-full flex items-center gap-3 pl-2 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  : "bg-black text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
            <svg  role='img' className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
            </svg>
            <span className='text-sm font-medium'>Email</span>
            </NavLink>

          </nav>

          <NavLink to="/chat" className={({ isActive }) => `w-full flex items-center gap-3 pl-2 py-2 mb-4 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  : "bg-black text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
              }`
            }
          >
          
          <span className='text-sm font-medium'> +  New chat</span>
          </NavLink> 
          
          <div className="">
            <h1 className='text-zinc-500 font-bold text-sm mb-3'>RECENT</h1>
            <div className='space-y-2 max-h-50 pr-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#000000] '>
              {Object.values(chats).map((chat,index) => (
                <button
                  onClick={() => { openChat(chat.id) }}
                  key={index}
                  type='button'
                  className='w-full flex items-center cursor-pointer rounded-xl hover:bg-zinc-900 px-2 py-1 text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white/90 transition hover:border-white hover:text-white'
                >
                  {chat.title}
              </button>
              ))}
            </div>
          </div>


          <div className='absolute bottom-1  h-12 w-50 rounded-lg bg:bg-zinc-800 hover:bg-zinc-900 flex items-center justify-between px-2 ' >
              <div className='h-2 flex items-center gap-2'>
                <svg  className='h-8 p-1 border rounded-2xl cursor-pointer bg-zinc-900 text-zinc-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                <span className='font-medium text-sm'>Username</span>
              </div>

              <div  className='h-2 flex items-center text-zinc-600'>
                <svg className='h-6 p-1 cursor-pointer hover:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM18 17V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V17H18ZM9 21H15V23H9V21Z"></path></svg>
              
                <svg className='h-6 p-1 cursor-pointer hover:text-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
              </div>
          </div>

        </aside>

        <section className='relative  w-full mx-auto overflow-hidden   h-screen min-w-0 flex flex-1 flex-col items-center gap-4 '>

          

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