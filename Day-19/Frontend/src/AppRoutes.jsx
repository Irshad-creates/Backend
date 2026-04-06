import  { BrowserRouter, Route, Routes } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
 
function AppRoutes(){

    const Home=()=>{
        return <h1>Welcome to home page</h1>
    }

    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes