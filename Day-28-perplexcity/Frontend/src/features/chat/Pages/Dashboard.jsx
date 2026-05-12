import React,{ useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux'


const Dashboard = () => {
    
  
  
  const chat = useChat()

 
  const { user } = useSelector(state => state.auth)
  // console.log(user)

    useEffect(()=>{
        chat.initailizeSocketConnection()
    },[])


    return (
    <main className='h-screen w-full bg-neutral-800 text-white md:p-5' >
      <section className='mx-auto flex h h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 ' >
        <aside className='hidden h-full w-74 shrink-0 rounded-3xl border bg-[#080b12] p-4 md:flex md:flex-col ' >
          <h1 className='mb-5 text-3xl font-semibold tracking-tight'>Perplexity</h1>

          <div className='space-y-2'>
            {Object.values(chats).map((chat, index)=>{
              <button className='w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white   ' >{chat.title}</button>
            })}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Dashboard
