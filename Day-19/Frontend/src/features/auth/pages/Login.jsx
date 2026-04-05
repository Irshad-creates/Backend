import React from 'react'
import "../style/form.scss"


const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form >
          <input type="text" name='Username' placeholder='Enter username'/>
          <input type="password" name='password' placeholder='Enter the password' />
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login