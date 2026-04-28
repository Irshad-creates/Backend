import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/Home/pages/Home"
import Playlists from "./features/Home/pages/Playlists"
import Library from "./features/Home/pages/Library"
import RightContainer from "./features/Home/components/RightContainer"
export const router = createBrowserRouter([
    {
        path:"/",
        element: <Protected ><Home /></Protected>,
        children:[
            {index :true, element :<RightContainer />},
            {path:"/playlists", element :<Playlists />},
            {path:"/library", element :<Library />}
        ]
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
        element:<Protected ><Library /> </Protected>
    }
])