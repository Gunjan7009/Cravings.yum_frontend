import React from "react";
import "./Footeropy.css";
import appstore from "../assets/appstore.png"
import googleplay from "../assets/google-play.png"
import fb from "../assets/Facebook.png"
import ig from "../assets/Instagram.png";
import tt from "../assets/TikTok.png";
import sc from "../assets/Snapchat.png"

const Footeropy = () => {
  return (
    <div>
      <footer className="footery">
        <div className="footer-section">
          <h1 className="footer-logo">Cravings<span>.yum</span></h1>
          <div className="app-links">
            <a href="#appstore" className="app-link">
              <img src={appstore} alt="Download on the App Store" />
            </a>
            <a href="#googleplay" className="app-link">
              <img src={googleplay} alt="Get it on Google Play" />
            </a>
          </div>
          <p className="company-info">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>
        <div className="footer-section">
          <h4>Get Exclusive Deals in your Inbox</h4>
          <form className="newsletter-form">
            <div className="input-container">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="newsletter-input"
              />
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </div>
          </form>
          <p className="spam-policy">
            we won't spam, read our <a href="#email-policy">email policy</a>
          </p>
          <div className="social-media-icons">
            {/* Add your social media icons here */}
            <a href="#facebook" className="social-icon"><img src={fb} alt="facebook"></img></a>
            <a href="#instagram" className="social-icon"><img src={ig} alt="instagram"></img></a>
            <a href="#tiktok" className="social-icon"><img src={tt} alt="tiktok"></img></a>
            <a href="#snapchat" className="social-icon"><img src={sc} alt="snapchat"></img></a>
          </div>
        </div>
        <div className="footer-sectionA">
          <h4>Legal Pages</h4>
          <ul>
            <li><a href="#terms">Terms and conditions</a></li>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#cookies">Cookies</a></li>
            <li><a href="#modern-slavery">Modern Slavery Statement</a></li>
          </ul>
        </div>
        <div className="footer-sectionA">
          <h4>Important Links</h4>
          <ul>
            <li><a href="#help">Get help</a></li>
            <li><a href="#add-restaurant">Add your restaurant</a></li>
            <li><a href="#sign-up">Sign up to deliver</a></li>
            <li><a href="#create-business">Create a business account</a></li>
          </ul>
        </div>

      </footer>
      <div className="footer-bottom">
        <p className="copyright">Order.uk Copyright 2024, All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="#privacy-policy">Privacy Policy</a></li>
          <li><a href="#terms">Terms</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#donotsell">Do not sell or share my personal information</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footeropy;

