// SharedCart.js - Reusable cart items display component
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from "../redux/cartSlice";
import deleteIcon from "../assets/deleteIcon.png";

const SharedCart = ({ items }) => {
    const dispatch = useDispatch();

    return (
        <div className="basket-items">
            {items.length > 0 ? (
                items.map((item) => (
                    <div className="basket-item" key={item.productId._id}>
                        <div className="item-left">
                            <div className="item-quantity">
                                <span>{item.quantity}x</span>
                            </div>
                        </div>
                        <div className="item-center">
                            <p className="item-pricee">₹{item.productId.price}</p>
                            <p className="item-name">{item.productId.Dish_name}</p>
                        </div>
                        <div className="item-right">
                            <button
                                className="remove-item"
                                onClick={() => dispatch(removeItemFromCart(item.productId._id))}
                            >
                                <img
                                    src={deleteIcon}
                                    alt="Delete"
                                    className="delete-icon"
                                />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Your basket is empty.</p>
            )}
        </div>
    );
};

export default SharedCart;
