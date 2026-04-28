import React, { use } from 'react'
import { useAuth } from '../hooks/use.auth'
import { Navigate, useNavigate } from 'react-router';


const Protected = ({children}) => {

    const {user, loading} =useAuth()
    const navigate = useNavigate()

    if(loading){
        return <h1>Loading..</h1>
    }

    if(!loading && !user ){
        return <Navigate to="/login" ></Navigate>
    }

  return children

}

export default Protected