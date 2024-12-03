import React, { useState, useEffect } from "react";
import api from "../data/api";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import "./FoodCard.css";

const FoodCard = ({ searchQuery }) => {
    const [groupedFoodItems, setGroupedFoodItems] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/receivefood");
                const data = response.data;

                const groupedData = data.reduce((acc, item) => {
                    acc[item.category] = acc[item.category] || [];
                    acc[item.category].push(item);
                    return acc;
                }, {});
                setGroupedFoodItems(groupedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching food items:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    // Filter grouped food items based on the search query
    const filteredGroupedFoodItems = Object.keys(groupedFoodItems).reduce(
        (acc, category) => {
            const filteredItems = groupedFoodItems[category].filter((item) =>
                item.Dish_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (filteredItems.length > 0) acc[category] = filteredItems;
            return acc;
        },
        {}
    );

    return (
        <div>
            {Object.keys(filteredGroupedFoodItems).length > 0 ? (
                Object.keys(filteredGroupedFoodItems).map((category) => (
                    <div key={category}>
                        <h2>{category}</h2>
                        <div className="foods-cards">
                            {filteredGroupedFoodItems[category].map((item) => (
                                <div className="food-card" key={item._id}>
                                    <div className="food-card-content">
                                        <h3 className="food-card-title">{item.Dish_name}</h3>
                                        <p className="food-card-description">
                                            {item.description}
                                        </p>
                                        <div className="food-card-footer">
                                            <span className="food-card-price">
                                                ₹ {item.price}/-
                                            </span>
                                        </div>
                                    </div>
                                    <div className="food-card-image-container">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="food-card-image"
                                        />
                                        <div className="food-add">
                                            <button
                                                className="food-add-button"
                                                onClick={() => dispatch(addItemToCart(item))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No items found matching your search.</p>
            )}
        </div>
    );
};

export default FoodCard;
