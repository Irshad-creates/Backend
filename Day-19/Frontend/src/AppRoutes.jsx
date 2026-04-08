import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

function AppRoutes(){



    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<h1>Welcome to home page</h1>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes

// export const router = createBrowserRouter([
//     {
//         path:"/login",
//         element: <Login />
//     },
//     {
//         path : "/register",
//         element :<Register />
//     },
//     {
//         path:'/',
//         element : <h1>WELCOME TO 4 LAYER OF ARCITECTURE OF REACT</h1>
//     }
// ])