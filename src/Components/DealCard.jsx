import React, { useState, useEffect } from "react";
import api from "../data/api";
import "./DealCard.css";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const DealCard = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await api.get("/dealscards");
                setCards(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load deals. Please try again.");
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return <div className="loading">Loading deals...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="deals-section">
             <div className="deals-header">
                <h1 className="deal-heading">
                    <span className="default-content">
                        Up to <span className="highlight">- 40%</span> 🎊 Cravings.yum
                        exclusive deals
                    </span>
                    <span className="mobile-content">
                        Up to -40% Discount Offers 🎊
                    </span>
                </h1>
                <div className="categories">
                    
                    <button
                        className={`dropdown-btn ${dropdownOpen ? "open" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <ExpandCircleDownIcon style={{ position: "relative", fontSize: "20px", top:"3px" }} /> Pizza & Fast food
                    </button>
                    <ul className={`foodlinksa ${dropdownOpen ? "open" : ""}`}>
                        <li>
                            <a href="#" className="fooditems">
                                Vegan
                            </a>
                        </li>
                        <li>
                            <a href="#" className="fooditems">
                                Sushi
                            </a>
                        </li>
                        <li>
                            <a href="#" className="fooditems active">
                                Pizza & Fast food
                            </a>
                        </li>
                        <li>
                            <a href="#" className="fooditems">
                                Others
                            </a>
                        </li>
                    </ul>
                </div>
            </div> 
            <div className="deals-cards">
                {cards.map((card, index) => (
                    <div className="dealcard" key={index}>
                        <div className="dealdiscount">
                            <p className="discountnumber">{card.discount}</p>
                        </div>
                        <div className="uss-gradient-overlay"></div>
                        <img
                            src={card.dealcardimgurl}
                            alt={card.dealcardname}
                            className="dealcard-image"
                        />
                        <div className="dealcard-gradient">
                            <span className="dealcategorylabel">{card.dealcardrestaurant}</span>
                            <h3 className="dealcardtitle">{card.dealcardname}</h3>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DealCard;
