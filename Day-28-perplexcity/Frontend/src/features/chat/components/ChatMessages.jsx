import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ChatMessages = ({chats, currentChatId, isGenerating}) => {
  return (
            <section className='w-full min-w-0 flex flex-1 overflow-hidden'>
              <div className='mx-auto flex h-full w-full max-w-4xl flex-col px-4 py-4'>
                <div className='messages flex-1 space-y-3 overflow-y-auto pr-2 '>
                  
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
    
                  {isGenerating && (
                      <div className="mr-auto rounded-2xl px-4 py-3 text-white/70">
                          <div className="flex gap-1">
                              <span className="animate-bounce">•</span>
                              <span className="animate-bounce [animation-delay:0.2s]">•</span>
                              <span className="animate-bounce [animation-delay:0.4s]">•</span>
                          </div>
                      </div>
                  )}
                </div>
    
                
              </div>
            </section>
  )
}

export default ChatMessages