import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import RestrauntCard from "../Components/RestrauntCard";
import Productimage from "../assets/Productimage.png";
import ratingImage from "../assets/ratingImage.png";
import minOrderImage from "../assets/minOrder.png";
import deliveryTimeImage from "../assets/deliveryTime.png";
import timerImage from "../assets/watch.png";
import WatchImage from "../assets/Watch2.png";
import ContactImage from "../assets/Contact.png";
import LocationImage from "../assets/Location.png";
import loactionImage from "../assets/loaction.png"
import FoodCard from "../Components/FoodCard";
import CustomerReviews from "../Components/Review";
import Footeropy from "../Components/Footeropy";
import MyMap from "../Components/MyMap";
import Basket from "../Components/Basket";
import OfferCard from "../Components/OfferCard";
import "./Product.css";
import SmallNav from "../Components/SmallNav";
import { useParams } from "react-router-dom";

const Product = () => {
  const { restaurantName } = useParams();
  const decodedRestaurantName = decodeURIComponent(restaurantName);
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const selectedRestaurant = useSelector(
  //   (state) => state.restaurant.selectedRestaurant
  // );

  const toggleBasket = () => {
    setIsBasketVisible((prev) => !prev);
  };

  return (
    <>
      <div className="smallmaatha">
        <div className="smallhdr">
          <SmallNav onToggleBasket={toggleBasket} />
        </div>
        <div className="hdr">
          <Header onToggleBasket={toggleBasket} />
        </div>
        <div className="nbr">
          <Navbar />
        </div>
      </div>
      <div className="location-smll">
        <img src={loactionImage} alt="Location Icon" className="location-icon-smll" />
        <p>Regent Street, A4, London....... </p>
      </div>
      <div className="main">
        <div className="main-section">
          <div className="main-content">
            <p className="tagline">I’m lovin’ it!</p>
            <h1 className="restaurant-name">{decodedRestaurantName}</h1>
            <div className="details">
              <div className="detail-item">
                <img
                  src={minOrderImage}
                  alt="Minimum Order"
                  className="detail-image"
                />
                <span>Minimum Order: 10 INR</span>
              </div>
              <div className="detail-item">
                <img
                  src={deliveryTimeImage}
                  alt=" delivery time"
                  className="detail-image"
                />
                <span>Delivery in 20-25 Minutes</span>
              </div>
            </div>
          </div>

          <div className="banner-image">
            <img
              src={Productimage}
              alt="McDonald's Food"
              className="banner-food-image"
            />
            <img
              src={ratingImage}
              alt="McDonald's Food"
              className="rating-image"
            />
          </div>
        </div>
        <div className="status">
          <img src={timerImage} alt="timer" className="timer" />
          <p className="open-status">Open until 3:00 AM</p>
        </div>
        <div className="offer-header">
          <h2>All Offers from {decodedRestaurantName}</h2>
          <div className="search-baar">
            <div className="search-icoon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
                style={{ width: "16px", height: "16px", color: "#6c757d" }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search from menu..."
              className="search-inpuut"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="nav">
        <ul className="nav-list">
          <li className="activee">Offers</li>
          <li>Burgers</li>
          <li>Fries</li>
          <li>Snacks</li>
          <li>Salads</li>
          <li>Cold drinks</li>
          <li>Happy Meal®</li>
          <li>Desserts</li>
          <li>Hot drinks</li>
          <li>Sauces</li>
          <li>Orbit®</li>
        </ul>
      </div>
      <div className="main">
        <div className="contentaa">
          <div className="foodcontent">
            <OfferCard />
            <FoodCard searchQuery={searchQuery} />
          </div>
          {isBasketVisible && (
            <>
              <div className="basket-container visible">
                <Basket />
              </div>
              <div
                className="modal-backdrop"
                onClick={() => setIsBasketVisible(false)}
              ></div>
              <div className="basket-modal">
                <Basket />
              </div>
            </>
          )}
        </div>
        <div className="info-section">
          <div className="info-card">
            <h3>
              <img src={LocationImage} alt="" className="info-image" /> Delivery
              information
            </h3>
            <ul>
              <li>
                <b>Monday : </b>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Tuesday : </b>8:00 AM–3:00 AM
              </li>
              <li>
                <b>Wednesday :</b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Thursday : </b>8:00 AM–3:00 AM
              </li>
              <li>
                <b>Friday : </b>8:00 AM–3:00 AM
              </li>
              <li>
                <b>Saturday :</b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Sunday :</b> 8:00 AM–12:00 AM
              </li>
            </ul>
            <p>
              <b>Estimated time until delivery :</b> 20 min
            </p>
          </div>
          <div className="info-card">
            <h3>
              <img src={ContactImage} alt="" className="info-image" /> Contact
              information
            </h3>
            <p>
              If you have allergies or other dietary <br />
              restrictions, please contact the restaurant. The <br />
              restaurant will provide food-specific <br />
              information upon request.
            </p>
            <p>
              <b>Phone number:</b> <br />
              +934443-43
            </p>
            <p>
              <b>Website:</b>{" "}
              <a href="http://mcdonalds.uk/">
                <br />
                http://mcdonalds.uk/
              </a>
            </p>
          </div>
          <div className="info-card dark-card">
            <h3>
              <img src={WatchImage} alt="" className="info-image" /> Operational
              Times
            </h3>
            <ul>
              <li>
                <b>Monday: </b>8:00 AM–3:00 AM
              </li>
              <li>
                <b>Tuesday : </b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Wednesday :</b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Thursday : </b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Friday : </b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Saturday :</b> 8:00 AM–3:00 AM
              </li>
              <li>
                <b>Sunday :</b> 8:00 AM–3:00 AM
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mid-footer">
        <div className="main">
          <div className="map">
            <MyMap />
          </div>
        </div>
        <div className="cs-review">
          <CustomerReviews />
        </div>

        <div className="main">
          <div className="heading">
            <h2>Similar Restaurants</h2>
            <RestrauntCard />
          </div>
        </div>
      </div>
      <Footeropy />
    </>
  );
};
export default Product;
