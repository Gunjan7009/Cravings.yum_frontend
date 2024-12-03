import React, { useState, useEffect } from "react";
import "./Navbar.css";
import userImg from "../assets/userimage.png";
import MenuIcon from '@mui/icons-material/Menu';
import logo2 from "../images/LOGO-2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.name);
    }
  }, []);

  const handleLoginClick = () => {
    if (!user) {
      window.location.href = "/signin";
    } else {
      console.log("User menu clicked");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-navbar">
      <nav className="navbar">
        <div className="logo-nav">
          <Link to="/">
            <img src={logo2} alt="Logo" className="navlogo" />
          </Link>
          <div className="hamburger" onClick={toggleMenu}>
            <MenuIcon  style={{fontSize:"50px"}}/>
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Browse Menu</a>
          </li>
          <li>
            <a href="#">Special Offers</a>
          </li>
          <li>
            <a href="#">Restaurants</a>
          </li>
          <li>
            <a href="#">Track Order</a>
          </li>
        </ul>

        <button className="login-button" onClick={handleLoginClick}>
          {user ? (
            <Link to="/profile">
              <div className="profilepart">
                <img src={userImg} alt="User Icon" className="user-icon" />
                <p className="user-name">{user}</p>
              </div>
            </Link>
          ) : (
            <>
              <img src={userImg} alt="User Icon" className="user-icon" />
              Login/Signup
            </>
          )}
        </button>
      </nav>

      {/* Background overlay */}
      <div
        className={`menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </div>
  );
};

export default Navbar;
