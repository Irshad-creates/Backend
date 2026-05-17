import { createBrowserRouter, Navigate } from "react-router"
import Login from "../features/auth/Pages/Login"
import Register from "../features/auth/Pages/Register"
import Protected from "../features/auth/components/Protected"
import Dashboard from "../features/chat/Pages/Dashboard"
import ChatPage from "../features/chat/Pages/ChatPage"
import EmailPage from "../features/chat/components/EmailPage"
import InstaPostPage from "../features/chat/components/InstaPostPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected >
                <Dashboard />
            </Protected>
  },
  {
    path: "/chats/new",
    element: <Protected >
                <ChatPage />
            </Protected>
  },
  {
    path: "/Email",
    element: <Protected >
                <EmailPage />
            </Protected>
  },
  {
    path: "/Instagram",
    element: <Protected >
                <InstaPostPage />
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
