import { login, register, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../api.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
            console.error("Register failed:", err)
        } finally {
            setLoading(false)
        }
    }

    

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        try {
            const data = await login({ username, email, password })
            setUser(data.user)
        } catch (err) {
            console.error("Login failed:", err)
        } finally {
            setLoading(false)
        }
    }




    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
        } catch (err) {
            console.error("Logout failed:", err)
        } finally {
            setUser(null)
            setLoading(false)
        }
    }

    return { user, 
        loading, 
        handleLogin, 
        handleRegister, 
        handleLogout }
}