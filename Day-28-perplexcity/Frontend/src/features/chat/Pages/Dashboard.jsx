// import React, { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useChat } from "../hooks/useChat";

// const Dashboard = () => {
//   const chat = useChat();
//   const [chatInput, setChatInput] = useState("");
//   const [selectedChatId, setSelectedChatId] = useState(null);

//   const { user } = useSelector((state) => state.auth);
//   const chats = useSelector((state) => state.chat.chats);

//   useEffect(() => {
//     chat.initailizeSocketConnection();
//     chat.handleGetChats();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const chatList = useMemo(() => Object.values(chats || {}), [chats]);

//   useEffect(() => {
//     if (!selectedChatId && chatList.length > 0) {
//       setSelectedChatId(chatList[0].id);
//     }
//   }, [chatList, selectedChatId]);

//   const activeMessages =
//     chats?.[selectedChatId]?.messages ?? chats?.[selectedChatId]?.message ?? [];

//   const userLabel =
//     user?.username ?? user?.name ?? user?.email?.split("@")?.[0] ?? "username";

//   async function openChat(chatId) {
//     setSelectedChatId(chatId);

//     try {
//       await chat.handleOpenChat(chatId);
//     } catch {}
//   }

//   async function handleSubmitMessage(event) {
//     event.preventDefault();

//     const trimmedMessage = chatInput.trim();

//     if (!trimmedMessage) {
//       return;
//     }

//     try {
//       await chat.handleSendMessage({ message: trimmedMessage, chatId: selectedChatId });
//     } catch {}

//     setChatInput("");
//   }

//   return (
//     <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
//       <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-[1500px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080b12] lg:h-[calc(100vh-2.5rem)] lg:flex-row">
//         <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#06080d] p-4 lg:w-80 lg:border-r lg:border-b-0">
//           <div className="flex items-center gap-3">
//             <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-sm text-white/80">
//               img
//             </div>
//             <h1 className="text-2xl font-semibold tracking-tight">perplexity</h1>
//           </div>

//           <div className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
//             {chatList.length > 0 ? (
//               chatList.map((chatItem) => {
//                 const isActive = chatItem.id === selectedChatId;

//                 return (
//                   <button
//                     key={chatItem.id}
//                     type="button"
//                     onClick={() => openChat(chatItem.id)}
//                     className={`w-full rounded-2xl border px-4 py-3 text-center text-base transition ${
//                       isActive
//                         ? "border-white/30 bg-white/10 text-white"
//                         : "border-white/10 bg-transparent text-white/80 hover:border-white/20 hover:bg-white/5"
//                     }`}
//                   >
//                     {chatItem.title}
//                   </button>
//                 );
//               })
//             ) : (
//               <div className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm text-white/50">
//                 no chats
//               </div>
//             )}
//           </div>

//           <div className="mt-4 flex items-center gap-3">
//             <div className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white/85">
//               {userLabel}
//             </div>
//             <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 text-sm text-white/70">
//               icon
//             </div>
//           </div>
//         </aside>

//         <section className="flex min-w-0 flex-1 flex-col">
//           <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
//             {activeMessages.length > 0 ? (
//               activeMessages.map((message, index) => {
//                 const isUser = message.role === "user";

//                 return (
//                   <div
//                     key={`${message.role}-${index}`}
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-base ${
//                       isUser
//                         ? "ml-auto bg-white/12 text-white"
//                         : "mr-auto border border-white/10 bg-transparent text-white/85"
//                     }`}
//                   >
//                     {message.content}
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="flex h-full items-center justify-center text-sm text-white/45">
//                 select a chat or type a message
//               </div>
//             )}
//           </div>

//           <footer className="border-t border-white/10 p-4 md:p-5">
//             <form onSubmit={handleSubmitMessage} className="flex items-center gap-3">
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder="input message"
//                 className="h-14 w-full rounded-2xl border border-white/15 bg-transparent px-5 text-base text-white outline-none placeholder:text-white/40 focus:border-white/30"
//               />
//               <button
//                 type="submit"
//                 className="h-14 rounded-2xl border border-white/15 px-6 text-base font-medium text-white transition hover:bg-white/5"
//               >
//                 send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'


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
    <main className='min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5'>
      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none'>
        <aside className='hidden h-full w-72 shrink-0 rounded-3xl border  bg-[#080b12] p-4 md:flex md:flex-col'>
          <h1 className='mb-5 text-3xl font-semibold tracking-tight'>Perplexity</h1>

          <div className='space-y-2'>
            {Object.values(chats).map((chat,index) => (
              <button
                onClick={()=>{openChat(chat.id)}}
                key={index}
                type='button'
                className='w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
              >
                {chat.title}
              </button>
            ))}
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

          <footer className='rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5'>
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