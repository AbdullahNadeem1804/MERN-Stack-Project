import React, { useState } from 'react';

const CredentialsHealth = () => {
  const [password, setPassword] = useState('');
  const [keywords, setKeywords] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && numberCriteria && uppercaseCriteria && specialCharCriteria) {
      return 'Strong';
    } else if (lengthCriteria && (numberCriteria || uppercaseCriteria)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  // Handle password strength check
  const handlePasswordCheck = () => {
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
  };

  // Function to generate a strong custom password from a keyword
  const generateStrongPassword = (keyword) => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = keyword;
    for (let i = 0; i < 8; i++) {
      password += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return password;
  };

  // Handle password generation
  const handlePasswordGeneration = () => {
    if (keywords) {
      const newPassword = generateStrongPassword(keywords);
      setGeneratedPassword(newPassword);
    } else {
      alert("Please enter a keyword to generate a password.");
    }
  };

  // Handle 'Enter' key press to trigger respective button action
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (document.activeElement === document.getElementById('password-input')) {
        handlePasswordCheck(); // Trigger password strength check
      } else if (document.activeElement === document.getElementById('keyword-input')) {
        handlePasswordGeneration(); // Trigger password generation
      }
    }
  };

  return (
    <center>
      <h1 className='mid-text'>
        Strong passwords are the first line of defense against cyber threats
      </h1>

      <div>
        <h2 style={{ color: '#361a64' }}>Enter Your Password</h2>
        <input 
          id="password-input"
          type={showPassword ? "text" : "password"} // Toggle between text and password input type
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onKeyPress={handleKeyPress}  // Listen for 'Enter' key press
        />
        <button className="submit" onClick={handlePasswordCheck}>Check Strength</button>
        {passwordStrength && (
          <p style={{ color: 'black' }}>Password Strength: {passwordStrength}</p>
        )}
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)} 
          style={{ marginTop: '10px' }}
        >
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
      </div>

      <h1 className='mid-text'>Generate a strong custom Password</h1>
      <div>
        <h2 style={{ color: '#361a64' }}>Enter a Keyword</h2>
        <input 
          id="keyword-input"
          type="text" 
          placeholder="Enter Keyword" 
          value={keywords} 
          onChange={(e) => setKeywords(e.target.value)} 
          onKeyPress={handleKeyPress}  // Listen for 'Enter' key press
        />
        <button className="submit" onClick={handlePasswordGeneration}>Generate Password</button>
        {generatedPassword && (
          <p style={{ color: 'black' }}>Generated Password: {generatedPassword}</p>
        )}
      </div>
    </center>
  );
};

export default CredentialsHealth;
