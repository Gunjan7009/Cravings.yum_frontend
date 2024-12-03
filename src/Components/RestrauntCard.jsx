import React, { useEffect, useState } from 'react';
import api from "../data/api";
import "./RestrauntCard.css";
import { useNavigate } from 'react-router-dom';

const RestrauntCard = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate = useNavigate();
    useEffect(() => {
        // Fetch the data from the API
        const fetchRestaurants = async () => {
            try {
                const response = await api.get("/restaurantlist");

                setBrands(response.data); // Assuming the API response is an array of restaurant objects
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleCardClick = (restaurantName) => {
        navigate(`/productpage/${ restaurantName }`);
    };

    return (
        <div className='main-card'>
            <div className="brand-categories">
                <div className="brand-container">
                    {brands.map((brand, index) => (
                        <div className="brandcard" key={index} onClick={() => handleCardClick(brand.restaurantName)}>
                            <img src={brand.logourl} alt={brand.restaurantName} className="brand-image" />
                            <h3 className="brandname">{brand.restaurantName}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestrauntCard;
