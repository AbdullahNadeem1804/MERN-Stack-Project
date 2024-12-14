import React, { useState } from 'react';
import axios from 'axios';

const EmailHealth = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission (Enter key or button click)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/check-email-health', { email });
      if (response.data) {
        setResult(response.data);  // Show the result from the backend
      } else {
        setError('No data received from the server.');
      }
      setLoading(false);
    } catch (error) {
      setError('Error checking email health. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <center>
      <h1 className="mid-text">
        Check DNS health of your email domain to ensure high email deliverability
      </h1>
      <h2 style={{ color: '#361a64' }}>Enter an Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
        <button type="submit" className="submit">Check Health</button>
      </form>

      {loading && <p style={{ color: 'black' }}>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div className="result">
          <h3 style={{ color: 'black' }}>Health Check Result</h3>
          <p style={{ color: 'black' }}>MX Records: {result.mxRecords}</p>
          <p style={{ color: 'black' }}>SPF: {result.spf}</p>
          <p style={{ color: 'black' }}>DKIM: {result.dkim}</p>
          <p style={{ color: 'black' }}>DMARC: {result.dmarc}</p>
        </div>
      )}
    </center>
  );
};

export default EmailHealth;
