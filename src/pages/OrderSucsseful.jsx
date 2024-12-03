import React, { useState , useEffect } from "react";
import Sucssesful from "../assets/Sucssesful.png";
import "./OrderSucsseful.css";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import api from "../data/api";
import Footeropy from "../Components/Footeropy";
import { Link } from "react-router-dom";

const OrderSucsseful = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/getcart");
                const data = response.data;
                console.log("Fetched Cart Data:", data);

               setCartItems(data.items || []);
               
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <div className="main">
            <Header />
            <Navbar />
            <div className="sucsseful">
                <div className="confirmation-section">
                    <div className="confirmation-icon">
                            <img src={Sucssesful} alt="Checkmark" className="checkmark-image" />
                    </div>
                    <h2>Order Placed Successfully</h2>
                    <p className="sucsseful-mgs">Your order is confirmed and on its way. Get set <br/>to savor your chosen delights!</p>
                    <div className="order-details">
                            {cartItems.map((item, index) => (
                                <p key={index}>{item.Dish_name}</p>
                            ))}
                            <Link to='/'><button className="back-home-button">Back to Home</button></Link>
                            
                    </div>
                </div>
            </div>
        </div>
        <Footeropy />
        </>
    );
};

export default OrderSucsseful;
