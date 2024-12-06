import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeItemFromCart, clearCart } from "../redux/cartSlice";
import cartImage from "../assets/cart.png";
import deleteIcon from "../assets/deleteIcon.png";
import CartShare from "./CartShare"; // Import the CartShare component
import SharedCart from "./SharedCart";
import share from "../assets/shareicon.png";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "./Basket.css";
import { Link } from "react-router-dom";
import scooter from "../images/scooter.png";
import storeimg from "../images/store.png";

const Basket = () => {
  const dispatch = useDispatch();
  const { items, subtotal, totalToPay, status } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    console.log("Cart State:", { items, subtotal, totalToPay });
  }, [items]);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [dispatch, status]);


  const handleRemoveItem = (productId) => {
    console.log("Dispatching removeItemFromCart for:", productId);
    dispatch(removeItemFromCart(productId));
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <CartShare />
      <div className="basket">
        <header className="basket-header">
          <img src={cartImage} className="cart-img" />
          <h1 className="cart-name">My Basket</h1>
        </header>
        <SharedCart items={items} onRemoveItem={handleRemoveItem} />
        <div className="basket-summary">
          <p>
            <b>Sub Total: </b>
            <span>₹{subtotal}</span>
          </p>
          <p>
            <b>Discounts:</b> <span>-₹3</span>
          </p>
          <p>
            <b>Delivery Fee: </b>
            <span>₹3</span>
          </p>
          <p>
            <b>Total to Pay:</b> <span>₹{totalToPay}</span>
          </p>
        </div>
        <div className="basket-summary">
          <button className="total-btn">
            <b>Total to pay</b>
            <span className="total-amount">
              <b>₹{totalToPay}</b>
            </span>
          </button>
          <div className="coupon-area">
            {" "}
            <input
              className="coupon-code"
              type="text"
              placeholder="Choose your free item.."
            />
            <ArrowCircleLeftIcon className="arrow-icon-down" />
          </div>
          <div className="coupon-area">
            <input
              className="coupon-code"
              type="text"
              placeholder="Apply Coupon Code here"
            />
            <ArrowCircleLeftIcon className="arrow-icon-right" />
          </div>
        </div>
        <div className="basket-summary">


          <button className="delivery-btn"><img src={scooter} alt="" className="deliveryvehicle" />Delivery Starts at 17:50</button>


          <button className="collection-btn"><img src={storeimg} alt="" className="storeimg" />Collection Starts at 15:50</button>
        </div>

        <button className="checkout-btn">
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <b>
              {" "}
              <ArrowCircleLeftIcon className="arrow-icon-checkout" />
              Checkout!
            </b>
          </Link>
        </button>
      </div>
    </>
  );
};

export default Basket;
