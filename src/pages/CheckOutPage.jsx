import React, { useEffect, useState } from "react";
import divider from "../images/divider.png";
import checkOutLoction from "../assets/checkoutloction.png";
import "./CheckOutPage.css";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footeropy from "../Components/Footeropy";
import RestrauntCard from "../Components/RestrauntCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import api from "../data/api";
const CheckOutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const[ subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getcart");
        const data = response.data;
        console.log("Fetched Cart Data:", data);

        setCartItems(data.items || []);
        setSubtotal(data.subtotal || 0);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []);
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      alert("No previous page found!");
    }
  };

     const grandtotal = Number(subtotal)+30;

  return (
    <>
      <div className="main">
        <Header />
        <Navbar />
        <div className="order-details-container">
          <h2 className="order-heading"><ArrowBackIcon style={{ width: "50px", color: "black" }} onClick={handleGoBack}/>Your Order Details</h2>
          <h2 className="check-head"><div className="checkout-back"><ArrowBackIcon /></div>Checkout</h2>
          <div className="order-content">
           
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.imageUrl} className="item-image" />
                  <div className="item-detail">
                    <h4 className="item-name">{item.Dish_name}</h4>
                          <p className="item-quantity">{item.quantity}</p>
                  </div>
                      <span className="item-price">{item.price}</span>
                  {index !== cartItems.length - 1 && ( 
                    <img src={divider} alt="" className="line-separator" />
                  )}
                </div>
              ))}
              <p style={{ margin: "0px", color: "#666", fontSize: "15px" }}>
                Notes
              </p>
              <textarea
                className="add-notes"
                placeholder="Add order notes"
                rows="2"
              ></textarea>
            </div>

         
            <div className="delivery-summary">
              <h3 className="del-add">Delivery Address</h3>
              <div className="delivery-area">
                <span>
                  <img
                    src={checkOutLoction}
                    alt="delivery Image"
                    className="delivery-img"
                  />
                </span>
                <div className="delivery-label">
                  <p style={{ marginBottom: "0px" }}>
                    <b>Delivery Address</b>
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "10px",
                      marginLeft: "0px",
                    }}
                  >
                    Available balance: ₹500
                  </p>
                </div>
                <Link to='/address'>< ArrowForwardIosIcon style={{ color: "#fc8a06", right: "90px", position: "absolute", height: "20px" }} /></Link>
                
              </div>
              <hr style={{ marginTop: "20px" }} />
              <div className="price-summary">
                <h3 className="order-summary">Order Summary</h3>
                <div className="price-row">
                  <span>Items</span>
                <span>₹{subtotal}</span>
                </div>
                <div className="price-row2">
                  <span>Sales Tax</span>
                  <span>₹30</span>
                </div>
                <hr />
                <div className="price-row total">
                  <span>Subtotal</span>
                                  <span>{grandtotal}</span>
                </div>
              </div>
              <hr className="hr-below"/>
              <Link to='/payment'>
              <button className="payment-button">Choose Payment Method</button>
            </Link>
            </div>
          </div>
        </div>
              <div className="heading">
                  <h2>Similar Restraunts</h2>
                  <RestrauntCard />
              </div>
      </div>
      <Footeropy className="foter"/>
    </>
  );
};

export default CheckOutPage;
