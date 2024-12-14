import React, { useState } from 'react';
import axios from 'axios';

const PhishingProtection = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setResult('Please enter a valid URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/check-phishing', { url });
      const { isPhishing, message } = response.data;
      setResult(message); // Display the message returned by the backend
    } catch (error) {
      console.error(error);
      setResult('Error checking URL. Please try again later.');
    }
  };

  return (
    <center>
      <h1 className="mid-text">
        Phishing websites often mimic real sites with
        incredible accuracy, making them hard to spot.
      </h1>
      <h2 style={{ color: '#361a64' }}>Enter a URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button className="submit" type="submit">
          Enter
        </button>
      </form>
      {result && <p style={{ marginTop: '20px', color: '#361a64' }}>{result}</p>}
    </center>
  );
};

export default PhishingProtection;
