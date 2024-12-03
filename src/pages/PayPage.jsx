import React, { useState, useEffect } from "react";
import wallet from "../assets/wallet.png";
import maestrokard from "../assets/maestrokard.png";
import payPal from "../assets/payPal.png";
import Stripe from "../assets/stripe.png";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./PaymentPage.css";
import api from "../data/api";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footeropy from "../Components/Footeropy";
import { Link } from "react-router-dom";

const OrderSucsseful = () => {
  const [subtotal, setSubtotal] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getcart");
        const data = response.data;
        console.log("Fetched Cart Data:", data);

        // setCartItems(data.items || []);
        setSubtotal(data.subtotal || 0);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []);

  const grandtotal = Number(subtotal) + 30;
  return (
    <>
      <div className="main">
        <Header />
        <Navbar />
        <div className="payment-content">
          <div className="payment-options">
            <div className="payment-heading">
              <div className="back-icon">
                <Link to="/checkout"><ArrowBackIcon  style={{color:"black"}}/></Link>
                
              </div>
             
              <h2>Choose and Pay</h2>
            </div>

            <div className="wallet">
              <div className="wallet-area">
                <span>
                  <img src={wallet} alt="Wallet Image" className="wallet-img" />
                </span>
                <div className="wallet-label">
                  <p >
                    <b>Wallet</b>
                  </p>
                  <p className="wallet-balancee">
                    Available balance: ₹500
                  </p>
                </div>
                <div className="aro-icon">
                <ArrowForwardIosIcon  />
                </div>
              </div>
            </div>
            <hr className="wallet-line"/>
            <div className="payment-method">
              <div className="payment-option">
                <span>
                  <img
                    src={maestrokard}
                    alt="masterCard"
                    className="pay-icon-img"
                  />
                </span>
                <p>MasterCard</p>
                <input
                  type="radio"
                  name="payment"
                  value="mastercard"
                  className="choose-btn1"
                />
              </div>
            </div>
            <div className="payment-method">
              <div className="payment-option">
                <span>
                  <img src={payPal} alt="" className="pay-icon-img" />
                </span>
                <p>PayPal</p>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  className="choose-btn2"
                />
              </div>
            </div>
            <div className="payment-method">
              <div className="payment-option">
                <span>
                  <img src={Stripe} alt="" className="pay-icon-img" />
                </span>
                <p>Stripe</p>
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  className="choose-btn3"
                />
              </div>
            </div>
            <div className="payment-method">
              <div className="payment-option">
                <span style={{ marginRight: "10px" }}>
                  <AddIcon />
                </span>
                <p>Add Debit Card</p>
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <hr className="amount-line"/>
            <div className="summary-item">
              <p style={{ color:"#83858A"}}>Amount to be paid</p>
              <p><b>₹{grandtotal}</b></p>
            </div>
            <hr
              style={{ width: "100%", backgroundColor: "#000", height: "1px" }}
            />
            <Link to='/ordersuccessful'>
            <button className="proceed-button">Proceed Payment</button>
            </Link>
          </div>
        </div>
      </div>
      <Footeropy />
    </>
  );
};

export default OrderSucsseful;
