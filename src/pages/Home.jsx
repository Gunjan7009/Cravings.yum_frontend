import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import RestrauntCard from "../Components/RestrauntCard";
import CategoryCard from "../Components/CategoryCards";
import DealCard from "../Components/DealCard";
import Footeropy from "../Components/Footeropy";
import mainImage from "../assets/Pizza.png";
import LaughImage from "../assets/laughing.png";
import noodlesImage from "../assets/noodles.png";
import sideImage from "../assets/orange.png";
import notification1 from "../assets/accept.png";
import notification2 from "../assets/received.png";
import notification3 from "../assets/dilever.png";
import AppStoreImage from "../assets/applestore.png";
import GooglePlayImage from "../assets/googleplay.png";
import ChefImage from "../assets/chef.png";
import DeliveryBoyImage from "../assets/deliveryboy.png";
import PlaceOrder from "../assets/PlaceOrder.png";
import TrackOrder from "../assets/TrackOrder.png";
import GetOrder from "../assets/GetOrder.png";
import LineImage from "../assets/Line.png";
import oneImage from "../assets/one.png";
import twoImage from "../assets/two.png";
import threeImage from "../assets/three.png";
import loactionImage from "../assets/loaction.png";
import api from "../data/api";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import SmallNav from "../Components/SmallNav";

const Home = () => {
  const [company, setCompanys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("/restaurantlist");
        setCompanys(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <div className="smallmaatha">
        <div className="smallhdr">
          <SmallNav />
        </div>
        <div className="hdr">
          <Header />
        </div>
        <div className="nbr">
          <Navbar />
        </div>
      </div>
      <div className="location-smll">
        <img
          src={loactionImage}
          alt="Location Icon"
          className="location-icon-smll"
        />
        <p>Regent Street, A4, London....... </p>
      </div>

      <div className="main">
        <div className="homepart">
          <div className="banner-section">
            <div className="content">
              <h3>Order Restaurant food, takeaway, and groceries.</h3>
              <h1>
                Feast Your Senses,
                <br /> <span>Fast and Fresh</span>
              </h1>
              <p>Enter a postcode to see what we deliver</p>
              <div className="search-bar">
                <input type="text" placeholder="e.g. EC4R 3TE" />
                <button type="submit" className="search-button">
                  Search
                </button>
                <button type="submit" className="small-search-button">
                  <ExpandCircleDownIcon
                    style={{
                      position: "relative",
                      rotate: "270deg",
                      fontSize: "36px",
                      right: "8px",
                      bottom: "2px",
                    }}
                  />
                </button>
              </div>
            </div>
            <div className="images">
              <img src={mainImage} alt="pizza image" className="pizza-image" />
              <img src={sideImage} alt="Side" className="side-image" />

              <img
                src={noodlesImage}
                alt="Noodles image"
                className="noodles-image"
              />
              <div className="notifications">
                <img src={oneImage} alt="one" className="one" />
                <img
                  src={notification1}
                  alt="Notification 1"
                  className="notification-1"
                />
                <img src={twoImage} alt="two" className="two" />
                <img
                  src={notification2}
                  alt="Notification 2"
                  className="notification-2"
                />
                <img src={threeImage} alt="three" className="three" />
                <img
                  src={notification3}
                  alt="Notification 3"
                  className="notification-3"
                />
              </div>
            </div>
          </div>
          <DealCard />
          <CategoryCard />
          <div className="heading">
            <h2>Popular Restraunts</h2>
            <RestrauntCard companies={company} />
          </div>

          <div className="banner2-section">
            <div className="banner2-image">
              <img
                src={LaughImage}
                alt="people laughing"
                className="laugh-image"
              />
              <img
                src={LaughImage}
                alt="people laughing"
                className="laugh-image2"
              />
            </div>
            <div className="banner2-content">
              <h1>
                Cravings<span className="orange-highlight">.yum</span>ing is
                more
              </h1>
              <div className="banner2-subtitle">
                <h2>
                  <span className="personalised-highlight">Personalised</span> &
                  Instant
                </h2>
              </div>
              <p>Download the Cravings.yum app for faster ordering</p>
              <div className="app-buttons">
                <img
                  src={AppStoreImage}
                  alt="App Store"
                  className="app-store-button"
                />
                <img
                  src={GooglePlayImage}
                  alt="Google Play"
                  className="google-play-button"
                />
              </div>
            </div>
          </div>
          <div className="uss-container">
            <div className="usscard">
              <div className="uss-banner">
                <p>Earn more with lower fees</p>
              </div>
              <div className="uss-gradient-overlay"></div>
              <img
                src={ChefImage}
                alt="Chef holding a rolling pin"
                className="uss-image"
              />
              <div className="uss-content1">
                <p className="uss-subtitle1">Signup as a business</p>
                <h2 className="uss-title1">Partner with us</h2>
                <button className="uss-button1">Get Started</button>
              </div>
            </div>
            <div className="usscard">
              <div className="uss-banner">
                <p>Avail exclusive perks</p>
              </div>
              <div className="uss-gradient-overlay"></div>
              <img
                src={DeliveryBoyImage}
                alt="Delivery rider with coffee"
                className="uss-image"
              />
              <div className="uss-content">
                <p className="uss-subtitle2">Signup as a rider</p>
                <h2 className="uss-title2">Ride with us</h2>
                <button className="uss-button2">Get Started</button>
              </div>
            </div>
          </div>

          <div className="about-section">
            <div className="more">
              <div>
                <h2>Know more about us!</h2>
              </div>
              <div className="tabs">
                <ul className="tabss">
                  <li className="active-tab">Frequent Questions</li>
                  <li>Who we are?</li>
                  <li>Partner Program</li>
                  <li>Help & Support</li>
                </ul>
              </div>
            </div>

            <div className="info-panel">
              <div className="faq">
                <h3 className="faq-heading">How does Cravings.yum work?</h3>
                <ul>
                  <li>What payment methods are accepted?</li>
                  <li>Can I track my order in real-time?</li>
                  <li>
                    Are there any special discounts or
                    <br /> promotions available?
                  </li>
                  <li>Is Cravings.yum available in my area?</li>
                </ul>
              </div>

              <div className="steps-container">
                <div className="steps">
                  <div className="step">
                    <p>Place an Order</p>
                    <img src={PlaceOrder} alt="Place an Order" />
                    <span>Place order through our website or Mobile app</span>
                  </div>
                  <div className="step2">
                    <p>Track Progress</p>
                    <img src={TrackOrder} alt="Track Progress" />

                    <span>
                      You can track your order status with delivery time
                    </span>
                  </div>
                  <div className="step">
                    <p>Get your Order!</p>
                    <img src={GetOrder} alt="Get Your Order" />

                    <span>Receive your order at a lightning-fast speed!</span>
                  </div>
                </div>
                <p className="flyer">
                  Cravings.yum simplifies the food ordering process. Browse through
                  our diverse menu,
                  <br /> select your favorite dishes, and proceed to checkout.
                  Your delicious meal will be <br />
                  on its way to your doorstep in no time!
                </p>
              </div>
            </div>
          </div>
          <div className="statbox">
            <div className="stats">
              <div className="stat">
                <h3>546+</h3>
                <p>Registered Riders</p>
              </div>
              <img src={LineImage} alt="line-image" className="line-image" />
              <div className="stat">
                <h3>789,900+</h3>
                <p>Orders Delivered</p>
              </div>
              <img src={LineImage} alt="line-image" className="line-image" />
              <div className="stat">
                <h3>690+</h3>
                <p>Restaurants Partnered</p>
              </div>
              <img src={LineImage} alt="line-image" className="line-image" />
              <div className="stat">
                <h3>17,457+</h3>
                <p>Food items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <Footeropy />
      
    </>
  );
};

export default Home;
