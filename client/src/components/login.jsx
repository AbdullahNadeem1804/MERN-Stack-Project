import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './styles/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/Login', {email, password})
      // Here you can handle form submission, e.g., send data to an API or validate the passwords
      .then(result => {
        console.log(result)
        if (result.data === "Login Successful") {
          navigate('/tools');
        } else {
          alert(result.data); // This will show "User not found" or "Login Failed"
        }        
      })
      
      .catch(err => console.log(err));
    };

  return (
    <div>
      <nav>
        <label className="logo">CyberGuard</label>
        <ul>
          <li><a href="/">Back</a></li>
        </ul>
        <div className="nav-buttons">
          <hr className="middle-line" />
          <a href="/signup"><button className="signup-btn">Signup</button></a>
        </div>
      </nav>

      <h1 className="sign-head">Log In</h1>
      <div className="form-container">
        <form id="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" 
          onChange={(e) => setEmail(e.target.value)}
          required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"
          onChange={(e) => setPassword(e.target.value)}
          required />

  
          <a href="">Forgot Password</a>
          
          <button type="submit" className="sign_log_button" >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
