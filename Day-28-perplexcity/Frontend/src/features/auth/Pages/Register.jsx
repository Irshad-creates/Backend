import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router'

const Register = () => {
   const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function handleSubmit(e){
        e.preventDefault()

        navigate("/")
    }


  return (
    <section className='bg-zinc-950 min-h-screen text-zinc-100 px-4 py-10'>
        <div className='main-contanier  mx-auto min-h-[85vh] w-full max-w-5xl flex items-center justify-center  '>
            <div className='w-sm max-w-md bg-zinc-900 border-0.5 border border-[#31b8c6] rounded-2xl p-8 shadow-2xl shadow-cyan-900/50' >
                <h1 className='text-xl font-bold text-[#31b8c6]'>Create your Account</h1>
                <p className='mt-1 text-sm text-zinc-300' >Register with your username, email and password</p>

                <form className='mt-4 space-y-5'  onSubmit={handleSubmit}>
                <div className=''>
                    <label htmlFor="username" className='mt-3 mb-1 block text-sm font-medium ' >Username</label>
                    <input 
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" name="username" id='username' placeholder='Enter your username' required className='w-full p-1 mt-1 bg-zinc-950 border border-[#31b8c6]  rounded-lg '/>

                    
                    
                    <label htmlFor="email" className='mt-3 mb-1 block text-sm font-medium ' >Email</label>
                    <input 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" name="email" id='email' placeholder='Enter your email' required className='w-full p-1 mt-1 bg-zinc-950 border border-[#31b8c6]  rounded-lg '/>

                    <label htmlFor="password" className='mt-3  mb-1 block text-sm font-medium '>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    type="password" name="password" id='password' placeholder='Enter your Password' required className='w-full p-1 mt-1  bg-zinc-950 border border-[#31b8c6]  rounded-lg'/>
                    
                </div>

                <button className='w-full bg-[#31b8c6] mt-1 p-2 rounded cursor-pointer active:scale-0.95 ' type='submit'>Register</button>
                </form>
                <p className='pt-4 text-sm flex'>Already have a Account?<Link to="/login" className='text-[#31b8c6] px-1' >Login here</Link> </p>
            </div>
        </div>
    </section>
  )
}

export default Register