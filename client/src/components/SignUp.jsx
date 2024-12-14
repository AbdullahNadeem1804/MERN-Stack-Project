import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './styles/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // Declare state variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/Registration', {
      firstName,
      lastName,
      email,
      password,
    })    
    // Here you can handle form submission, e.g., send data to an API or validate the passwords
    .then(result => console.log(result))
    .then(() => navigate('/login'))
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
          <a href="/login"><button className="login-btn">Login</button></a>
        </div>
      </nav>

      <h1 className="sign-head">Sign Up</h1>
      <div className="form-container">
        <form id="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
