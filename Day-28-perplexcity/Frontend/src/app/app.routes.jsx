import { createBrowserRouter } from "react-router"
import Login from "../features/auth/Pages/Login"
import Register from "../features/auth/Pages/Register"
import Home from "../features/auth/Pages/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])
