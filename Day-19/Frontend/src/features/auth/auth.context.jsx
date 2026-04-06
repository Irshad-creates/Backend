import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api.jsx";
export const authContext = createContext()

export function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleLogin = async (username, password)=>{
        setLoading(true)

        try {
            const response = await login(username, password)
            setUser(response)
            return response

        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }


    const handleRegister = async (username, email ,password)=>{
        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response)
            return response

        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }


    return (
        <authContext.Provider value={{user, loading, handleLogin, handleRegister}}>
            {children}
        </authContext.Provider>
    )
}
