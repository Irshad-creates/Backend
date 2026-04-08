import AppRoutes from "./AppRoutes"
import "./style.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { PostContextProvider } from "./features/post/Post.context.jsx"

function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
