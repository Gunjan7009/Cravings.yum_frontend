import React, { useEffect, useState } from "react";
import api from "../data/api";
import "./CategoryCard.css"; // Styles

const CategoryCard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/popularfood");
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div className="loading">Loading popular categories...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="popular-categories">
            <h2 className="popular-header">
                Cravings.yum Popular Categories{" "}
                <span role="img" aria-label="smiley">
                    🤩
                </span>
            </h2>
            <div className="categories-container">
                {categories.map((category, index) => (
                    <div className="categorycard" key={index}>
                        <img
                            src={category.foodurl}
                            alt={category.popularfoodname}
                            className="category-image"
                        />
                        <h3 className="categoryname">{category.popularfoodname}</h3>
                        <p className="restaurantcount">{category.no_of_restaurant}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
