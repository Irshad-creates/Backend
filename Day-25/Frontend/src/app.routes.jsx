import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/Home/pages/Home"
import Playlists from "./features/Home/pages/Playlists"

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Protected ><Home /></Protected>
    },
    {
        path:"/login",
        element : <Login />
    },
    {
        path:"/register",
        element: <Register />
    },
    {
        path:"/playlists",
        element: <Protected><Playlists /></Protected>
    },
    {
        path:"/library",
        element:<Protected ><Library /></Protected>
    }
])