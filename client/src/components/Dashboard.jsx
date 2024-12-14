import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/dashcss.css';

const Dashboard = () => {
  const navigate = useNavigate();

    // Function to handle logout and redirect to home
    const handleLogout = () => {
      // You can add any logout logic here (e.g., clearing session, tokens, etc.)
      navigate('/');  // Redirects to the home page
    };

  return (
    <div>
      <div className="navbar">
        <label className="logo">CyberGuard</label>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/tools">Tools</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="container">
        <div className="left-sidebar">
          <button className="side-btn" onClick={() => navigate('/tools')}>Phishing Protection</button>
          <button className="side-btn" onClick={() => navigate('/tools/email-health')}>Email Health</button>
          <button className="side-btn" onClick={() => navigate('/tools/cred-health')}>Credentials Health</button>

        </div>
        <div className="main-content">
          {/* Render nested route content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
