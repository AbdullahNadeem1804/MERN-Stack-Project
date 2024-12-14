import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PhishingProtection from './components/PhishingProtection';
import EmailHealth from './components/EmailHealth';
import CredentialsHealth from './components/CredentialsHealth';
import SignUp from './components/SignUp';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Nested Routes for Dashboard */}
        <Route path="/tools" element={<Dashboard />}>
          <Route index element={<PhishingProtection />} />
          <Route path="email-health" element={<EmailHealth />} />
          <Route path="cred-health" element={<CredentialsHealth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
