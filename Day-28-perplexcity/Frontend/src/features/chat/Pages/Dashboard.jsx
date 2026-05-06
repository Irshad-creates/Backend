import React,{ useEffect } from 'react'
import { useChat } from '../hooks/useChat'
// import { useSelector } from 'react-redux'


const Dashboard = () => {
    
    // const { user } = useSelector(state => state.auth)
    // console.log(user)


    const chat = useChat()
    useEffect(()=>{
        chat.initailizeSocketConnection()
    },[])


    return (
    <div>Dashboard</div>
  )
}

export default Dashboard