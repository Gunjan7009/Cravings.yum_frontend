import React, { useState, useEffect } from "react";
import api from "../data/api"; 
import "./OfferCard.css";

const OfferCard = () => {
    const [cards, setCards] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchOfferCards = async () => {
            try {
                const response = await api.get("/offercards");
                setCards(response.data); 
                setLoading(false);
            } catch (err) {
                setError("Failed to load offers. Please try again later.");
                setLoading(false);
            }
        };

        fetchOfferCards();
    }, []);

    if (loading) {
        return <div className="loading">Loading offers...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="offers-cards">
            {cards.map((card, index) => (
                <div className="offercard" key={index}>
                    <div className="offer-discount">
                        <p className="discount-number">{card.discount}</p>
                    </div>
                    <div className="uss-gradient-overlay"></div>
                    <img
                        src={card.offercardimgurl}
                        alt={card.category}
                        className="offercard-image"
                    />
                    <div className="offercard-subtitle">
                        <span className="offer-category-label">{card.offercardrestaurant}</span>
                        <h3 className="offer-card-title">{card.category}</h3>
                    </div>
                    <div className="offer-add">
                        <button className="offer-add-button">+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfferCard;
