import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../data/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemFromCart } from "../redux/cartSlice";
import SharedCart from "./SharedCart";
import "./Basket.css";
import Loader from "./Loader";

const SharedCartPage = () => {
    const { sharedLinkId } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.cart);

    useEffect(() => {
        // Fetch the cart details when the component mounts
        dispatch(fetchCart());
    }, [dispatch, sharedLinkId]);

    // Handle item removal
    const handleRemoveItem = (productId) => {
        console.log("Dispatching removeItemFromCart for:", productId);
        dispatch(removeItemFromCart(productId));
    };

    if (status === "loading") return <Loader />;


    return (
        <div>
            <h1>Shared Cart</h1>
            <SharedCart items={items} onRemoveItem={handleRemoveItem} />
            <button
                onClick={() => navigate("/checkout")}
                className="checkout-btn"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default SharedCartPage;
