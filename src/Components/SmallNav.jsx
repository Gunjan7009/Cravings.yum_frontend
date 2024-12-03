import React, { useState, useEffect } from "react";
import profileImage from "../images/dp.png";
import cartIcon from "../assets/cart.png";
import "./SmallNav.css";
import { Link } from "react-router-dom";

const SmallNav = ({ onToggleBasket }) => {
  const [user, setUser] = useState("");

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
  return (
    <>
      <nav className="smnav">
        <div className="nav-item-profile" onClick={handleLoginClick}>
          {user ? (
            <Link to="/profile">
              <img src={profileImage} alt="Profile" className="profile-img" />
              <span className="profile-text">{user}</span>
            </Link>
          ) : (
            <>
              <img src={profileImage} alt="User Icon" className="profile-img" />
              Login/Signup
            </>
          )}
        </div>
        <div className="nav-item-cart" onClick={onToggleBasket}>
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <span className="cart-text">My Cart</span>
        </div>
      </nav>
    </>
  );
};

export default SmallNav;
