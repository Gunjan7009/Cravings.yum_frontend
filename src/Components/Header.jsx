
import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import cartImage from "../assets/cart.png";
import arrowImage from "../assets/arrow.png";
import loactionImage from "../assets/loaction.png";

const Header = ({ onToggleBasket }) => {

    // const cartItems = useSelector((state) => state.cart.items);
    // const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="main-header">
            <header className="header-section">
                {/* Promotional Bar */}
                <div className="promo-bar">
                    <p>
                        🌟 Get 5% Off your first order, <span className="promo-code">Promo: ORDER5</span>
                    </p>
                </div>

                {/* Location Section */}
                <div className="location">
                    <img src={loactionImage} alt="Location Icon" className="location-icon" />
                    <p>Regent Street, A4, London</p>
                    <a href="#" className="change-location">
                        Change Location
                    </a>
                </div>

                {/* Cart Section */}
                <div className="cart-section">
                    <div className="my-cart" onClick={onToggleBasket}>
                        <img src={cartImage} alt="Cart Icon" className="cart-icon" />
                        <p>My Cart</p>
                        {/* {totalItems > 0 && <span className="cart-count">{totalItems}</span>} */}
                    </div>
                    <div className="rupees"></div>
                    <div className="dropdown">
                        <img src={arrowImage} alt="Dropdown Icon" className="arrow-icon" onClick={onToggleBasket} />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;

