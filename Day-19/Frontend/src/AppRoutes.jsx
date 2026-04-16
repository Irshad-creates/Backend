import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/post/pages/Feed"
import CreatPost from "./features/post/pages/CreatPost"

function AppRoutes(){



    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Feed/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/createPost" element={<CreatPost />} />
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