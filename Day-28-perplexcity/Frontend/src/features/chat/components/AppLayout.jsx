import React from 'react'
import Sidebar from './Sidebar'
import { useState } from "react"
import MobileNavbar from "./MobileNavbar"
const AppLayout = ({ children, chats, openChat, handleLogout}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (

        <main className='min-h-screen w-full bg-black text-white scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#000000] '>
            <MobileNavbar
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full rounded-3xl border-none'>

                <div className={`
                        fixed top-0 left-0 z-50 h-full bg-black shadow-2xl
                        transform transition-transform duration-300 ease-in-out
                        md:relative md:translate-x-0
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <Sidebar
                        chats={chats}
                        openChat={openChat}
                        handleLogout={handleLogout}
                    />
                </div>
                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className='fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden'
                    />
                )}

                {children}

            </section>

        </main>
    )
}

export default AppLayout