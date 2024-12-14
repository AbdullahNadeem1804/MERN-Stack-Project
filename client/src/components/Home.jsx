import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './styles/signup.css';
import './styles/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use import statements for images
import image2Path from './assets/Phish.png';
import image1Path from './assets/health-check.png';
import image3Path from './assets/mailhealth.png';
import image4Path from './assets/image1.jpg';
import image5Path from './assets/img2.jpg';
import image6Path from './assets/slider1.webp';

function Home() {
  const [email, setEmail] = useState(''); // State for email input
  const [currentSlide, setCurrentSlide] = useState(0); // State for current slide

  const slides = [
    {
      src: image4Path,
      caption: 'Email Health',
      description:
        'Analyze your email health, ensuring proper configurations and protection against breaches. Maintain secure communication and prevent vulnerabilities.',
    },
    {
      src: image5Path,
      caption: 'Credentials Health',
      description:
        'Test the strength of your credentials to prevent weak or reused passwords from becoming targets for attackers. Enhance security with actionable insights.',
    },
    {
      src: image6Path,
      caption: 'Phishing Protection',
      description:
        'Protect yourself from malicious websites using CyberGuard\'s phishing detection. Avoid scams and fraudulent links with comprehensive website analysis.',
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/Subscribe', { email })
      .then((res) => {
        alert('Subscribed successfully!');
        setEmail(''); // Clear the input field
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to subscribe. Please try again.');
      });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <section className="sec-home">
        <nav>
          <label className="logo">CyberGuard</label>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Tools</Link></li>
            <li><a href="#security" id="gotosec">Safety</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
          <div className="nav-buttons">
            <Link to="/signup"> <button className="signup-btn"> Sign Up</button></Link>
            <hr className="middle-line" />
            <Link to="/login"><button className="login-btn">Login</button></Link>
          </div>
        </nav>

        <h1 className="home-head">Your All In One <br />Cyber Security Tool</h1>
        <center><p className="fade-in-p">We want the Internet to be a Safer Space <br />for everyone</p></center>
      </section>

      <section className="section-about-tool">
        <h1 className="tool_sec_head">Our Tools</h1>
        <p style={{ color: '#372D48', fontSize: '24px', textAlign: 'center' }}>
          Discover the tools we provide for your cybersecurity needs.
        </p>

        <div className="card-container">
          <div className="card">
            <div className="square"><img src={image1Path} alt="Credentials Healthcheck" /></div>
            <div className="description">Credentials Health: We will test how strong your Credentials are</div>
          </div>
          <div className="card">
            <div className="square"><img src={image2Path} alt="Phishing Protection" /></div>
            <div className="description">Phishing Protection: The internet can be scary, We'll test out if a website is malicious.</div>
          </div>
          <div className="card">
            <div className="square"><img src={image3Path} alt="Email Health" /></div>
            <div className="description">Email Health: Get full visibility of your email's health status in one concise report.</div>
          </div>
        </div>
      </section>

      {/* Security Section with Updated Slideshow */}
      <section className="sec-security" id="security">
        <h1 className="security_head">Security</h1>
        <p className="mid-para">Explore how CyberGuard helps you stay secure.</p>

        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
              <img src={slide.src} alt={slide.caption} className="slide-image" />
              <div className="slide-text">
                <h2 className="caption">{slide.caption}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}

          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      <section className="section-about-tool">
        <h1 className="aboutus_sec_head" id="about">About Us</h1>
        <p style={{ color: '#372D48', fontSize: '20px', textAlign: 'center' }}>
          Welcome to CyberGuard! We are a team of cybersecurity students passionate about enhancing digital security and learning hands-on skills. CyberGuard was developed as part of our project to create a platform that provides essential cybersecurity tools, aimed at helping users safeguard their online presence. Our mission is to offer a resource that empowers everyone to stay informed, secure, and prepared against cyber threats.
        </p>
        <hr className="about-us-line" />
        <div className="bottom-bar">
          <h1 className="cyberguard-heading">CyberGuard</h1>
          <div className="updates-section">
            <label htmlFor="input-text" className="get-updates-label">Get updates</label>
            <div className="input-group">
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  id="email-input"
                  className="bottom-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-button">Subscribe</button>
              </form>
            </div>
            <div className="small-buttons">
              <button className="small-round-button"></button>
              <button className="small-round-button"></button>
              <button className="small-round-button"></button>
              <button className="small-round-button"></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
