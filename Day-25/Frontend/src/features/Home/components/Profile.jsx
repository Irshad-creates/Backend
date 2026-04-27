import React, { useEffect, useRef, useState } from 'react'
import { LuUserRound } from "react-icons/lu";

const Profile = ({className}) => {

    
        const [open, setOpen] = useState(false)
        const menuRef = useRef()

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                 setOpen(false);
            }
        };

        document.addEventListener("mousedown",handleClickOutside);
        return()=> document.removeEventListener("mousedown",handleClickOutside)

    },[])

    return (
            <div className='ProfileWrapper' ref={menuRef}>
                <div className="profileIcon" onClick={() => setOpen(!open)}>
                    <LuUserRound />
                </div>
                {open && (
                    <div className="dropdown">
                        <div className="userInfo">
                            <h4>test</h4>
                            <p>test@test.com</p>
                        </div>

                        <div className="menuItem">My Playlist</div>
                        <div className="menuItem">My Vibe</div>
                        <div className="menuItem logout">Logout</div>
                    </div>
                )}
            </div>
            )
    }


export default Profile