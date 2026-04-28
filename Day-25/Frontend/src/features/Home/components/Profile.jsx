import React, { useEffect, useRef, useState, useContext } from 'react'
import { LuUserRound } from "react-icons/lu"
import { useNavigate } from "react-router"
import { AuthContext } from "../../auth/api.context"  // adjust path if needed
import { useAuth } from '../../auth/hooks/use.auth'

const Profile = ({ className }) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef()
    const navigate = useNavigate()
    const { user, handleLogout } = useAuth()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const onLogout = async () => {
        await handleLogout()
        navigate("/login")      // redirect to login after logout
    }

    return (
        <div className='ProfileWrapper' ref={menuRef}>
            <div className="profileIcon" onClick={() => setOpen(!open)}>
                <LuUserRound />
            </div>
            {open && (
                <div className="dropdown">
                    <div className="userInfo">
                        <h4>{user?.username || "User"}</h4>
                        <p>{user?.email || ""}</p>
                    </div>
                    <div className="menuItem">My Playlist</div>
                    <div className="menuItem">My Vibe</div>
                    <div className="menuItem logout" onClick={onLogout}>Logout</div>
                </div>
            )}
        </div>
    )
}

export default Profile