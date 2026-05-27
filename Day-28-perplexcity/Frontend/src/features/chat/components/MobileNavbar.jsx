import React from 'react'

const MobileNavbar = ({ setIsSidebarOpen }) => {
  return (
    <div className='md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-black'>
            <button
                onClick={() => setIsSidebarOpen(true)}
                className='text-white text-2xl'
            > ☰ </button>

            <h1 className='text-white font-semibold text-lg'>Perplexity</h1>
        <div className='w-6'></div>
    </div>
  )
}

export default MobileNavbar