import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/Pages/Login";
import Register from "../features/auth/Pages/Register";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/chat/Pages/Dashboard";
import ChatPage from "../features/chat/Pages/ChatPage";
import EmailPage from "../features/chat/Pages/EmailPage";
import PublicRoute from "../features/auth/components/PublicRoute";
import ChatsPage from "../features/chat/components/ChatsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/chats/new",
    element: (
      <Protected>
        <ChatPage />
      </Protected>
    ),
  },
  {
    path: "/Email",
    element: (
      <Protected>
        <EmailPage />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/chats",
    element: (
      <Protected>
        <ChatsPage />
      </Protected>
    ),
  },
]);
