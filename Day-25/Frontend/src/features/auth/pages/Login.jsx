import React from 'react'
import "../style/login.scss"
const Login = () => {
  return (
    <main className="login-page">
        <div className="from-container">
            <h1>Home</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' required />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login