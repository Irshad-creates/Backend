import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { useNavigate, NavLink } from "react-router-dom"
import { setCurrentChatId } from '../chat.slice'
import { useAuth } from '../../auth/Hooks/useAuth.js'

const Dashboard = () => {
  const chat = useChat()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const { handleLogout } = useAuth()
  
  useEffect(() => {
    chat.handleGetChats()
  }, [])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const trimmedMessage = searchInput.trim()
    if (!trimmedMessage) {
      return
    }
    console.log(`🏠 Dashboard: Starting chat with currentChatId:`, currentChatId);
    handleStartChat(trimmedMessage)
  }

  const handleStartChat = (message) => {
    console.log(`🚀 Dashboard: handleStartChat called with currentChatId:`, currentChatId);
    chat.handleSendMessage({ message, chatId: currentChatId || null })
    navigate('/chats/new')
    setSearchInput('')
  }

  const handleSuggestionClick = (suggestion) => {
    handleStartChat(suggestion)
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    navigate('/chats/new')
  }

  const suggestedQuestions = [
    "Summarize this: TechCrunch | Startup and Technology News",
    "Tell me more about The Latest News in Technology ...",
    "What are the top 5 programming news today?",
    "Explain the latest tech market shifts"
  ]

  const newsResults = [
    {
      title: "TechCrunch | Startup and Technology News",
      source: "NEWS · TECHCRUNCH.COM"
    },
    {
      title: "The Latest News in Technology | PCMag",
      source: "NEWS · PCMAG.COM"
    },
    {
      title: "Technology - The New York Times",
      source: "NEWS · NYTIMES.COM"
    },
    {
      title: "Tech | CNN Business",
      source: "NEWS · CNN.COM"
    }
  ]

  return (
    <main className='min-h-screen w-full bg-black text-white'>
      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full rounded-3xl border-none'>
        {/* Sidebar */}
        <aside className='relative hidden h-full w-60 shrink-0 border-r border-zinc-700 p-4 md:flex md:flex-col'>
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

          <NavLink to="/chats/new" className={({ isActive }) => `w-full flex items-center gap-3 pl-2 py-2 mb-4 rounded-lg transition-all duration-200
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
              {Object.values(chats).map((chatItem, index) => (
                <button
                  onClick={() => { openChat(chatItem.id) }}
                  key={index}
                  type='button'
                  className='w-full flex items-center cursor-pointer rounded-xl hover:bg-zinc-900 px-2 py-1 text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white/90 transition hover:border-white hover:text-white'
                >
                  {chatItem.title}
              </button>
              ))}
            </div>
          </div>

          <div className='absolute bottom-1  h-12 w-50 rounded-lg bg:bg-zinc-800 hover:bg-zinc-900 flex items-center justify-between px-2 ' >
              <div className='h-2 flex items-center gap-2'>
                <svg  className='h-8 p-1 border rounded-2xl cursor-pointer bg-zinc-900 text-zinc-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                <span className='font-medium text-sm'>Username</span>
              </div>

              <div  className='flex items-center gap-1 text-zinc-600'>
                <svg className='h-6 p-1 cursor-pointer hover:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM18 17V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V17H18ZM9 21H15V23H9V21Z"></path></svg>
              
                <button onClick={handleLogout}>
                  <svg
                    className='h-6 p-1 cursor-pointer hover:text-red-400'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
                  </svg>
                </button>
              </div>
          </div>
        </aside>

        {/* Home Content Section */}
        <section className='w-full min-w-0 flex flex-1 overflow-hidden'>
          <div className='mx-auto flex h-full w-full flex-col px-4 py-4 overflow-y-auto'>
            {/* Perplexity Logo and Title */}
            <div className='flex flex-col items-center justify-center py-8'>
              <h1 className='text-5xl font-bold mb-8'>Perplexity</h1>
              
              {/* Categories */}
              <div className='flex gap-3 mb-8 flex-wrap justify-center'>
                <button onClick={() => handleSuggestionClick('Trending Tech')} className='px-4 py-2 rounded-full border border-white/30 hover:border-white/60 text-sm transition'>Trending Tech</button>
                <button onClick={() => handleSuggestionClick('Startups')} className='px-4 py-2 rounded-full border border-white/30 hover:border-white/60 text-sm transition'>Startups</button>
                <button onClick={() => handleSuggestionClick('AI Tools')} className='px-4 py-2 rounded-full border border-white/30 hover:border-white/60 text-sm transition'>AI Tools</button>
                <button onClick={() => handleSuggestionClick('Gadgets')} className='px-4 py-2 rounded-full border border-white/30 hover:border-white/60 text-sm transition'>Gadgets</button>
              </div>

              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} className='w-full max-w-2xl mb-8'>
                <div className='rounded-3xl border border-white/60 bg-[#080b12] p-4'>
                  <div className='flex flex-row gap-3'>
                    <input
                      type='text'
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder='Ask anything...'
                      className='flex-1 bg-transparent text-white outline-none placeholder:text-white/45 text-lg'
                    />
                    <button type='submit' disabled={!searchInput.trim()} className='text-white/60 hover:text-white disabled:opacity-50'>
                      <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 12a8 8 0 0 1 15.15-3.5M4 12a8 8 0 0 0 15.15 3.5M12 2v8m0 6v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Suggested Questions */}
            <div className='mb-8 px-4'>
              <div className='space-y-2'>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className='w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white/80'
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* News Results Grid */}
            <div className='mb-8 px-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                {newsResults.map((news, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(news.title)}
                    className='p-4 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition text-left'
                  >
                    <h3 className='font-semibold text-white mb-1'>{news.title}</h3>
                    <p className='text-xs text-white/60'>{news.source}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Capabilities Section */}
            <div className='px-4'>
              <h2 className='text-white/60 font-semibold text-sm mb-4'>CAPABILITIES</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <NavLink to='/Instagram' className='p-4 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition'>
                  <div className='flex items-center gap-3 mb-2'>
                    <svg className='h-6 text-pink-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                    </svg>
                    <h3 className='font-semibold text-white'>Post to Instagram</h3>
                  </div>
                  <p className='text-sm text-white/70'>Instantly create and publish image posts directly to your Instagram account.</p>
                </NavLink>

                <NavLink to='/Email' className='p-4 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition'>
                  <div className='flex items-center gap-3 mb-2'>
                    <svg className='h-6 text-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                    </svg>
                    <h3 className='font-semibold text-white'>Send Emails</h3>
                  </div>
                  <p className='text-sm text-white/70'>Draft and send professional emails straight from the chat interface.</p>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard
