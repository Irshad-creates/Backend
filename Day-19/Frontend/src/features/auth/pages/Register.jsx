import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import  { useAuth } from "../hooks/useAuth"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {handleRegister} = useAuth()

  async function handleFormSubmit(e) {
    e.preventDefault();

    handleRegister(username, email, password)
    .then(res=>{
      console.log(res)
    })  
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your name"
          />

          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter your email id"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter the password"
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login{" "}
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
