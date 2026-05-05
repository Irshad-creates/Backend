import { useDispatch } from "react-redux";
import { register, login, getME } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";


export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister({username , email, password}) {
        try {
            dispatch(setLoading(true))
            const data = await register({username, email, password})
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true))
            const data =  await login({email, password})
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "login failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetME(){
        try {
            dispatch(setLoading(true))
            const data = await getME()
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "failed to fetch user"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,handleLogin,handleGetME
    }
}