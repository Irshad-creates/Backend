import { createBrowserRouter, Navigate } from "react-router"
import Login from "../features/auth/Pages/Login"
import Register from "../features/auth/Pages/Register"
import Protected from "../features/auth/components/Protected"
import Dashboard from "../features/chat/Pages/Dashboard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected >
                <Dashboard />
            </Protected>
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace/>
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
