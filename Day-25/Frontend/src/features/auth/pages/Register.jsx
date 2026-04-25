import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'

import { useAuth } from '../hooks/use.auth'

const Register = () => {

  const{loading, handleRegister} = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate("/login")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register </h1>
        <form onSubmit={handleSubmit}>
          <FormGroup 
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          label="Username" placeholder="Enter Username" 
          />
          <FormGroup 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          label="Email" placeholder="Enter Email"
          />
          <FormGroup 
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          label="password" placeholder="Enter Password"
          />

          <button className='button' type='submit'>Register</button>
        </form>
        <p>Already have Account?<Link to="/login" > Login here</Link> </p>
      </div>
    </main>
  )
}

export default Register