import { useSelector } from "react-redux"
import { Navigate } from "react-router"

export default function PublicRoute({ children }) {

    const { user, isAuthChecked } = useSelector(state => state.auth)

    if (!isAuthChecked) {
        return <p>Loading...</p>
    }

    if (user) {
        return <Navigate to="/" />
    }

    return children
}