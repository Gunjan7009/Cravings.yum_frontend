import React, { useState, useEffect } from "react";
import api from "../data/api";
import { useForm } from "react-hook-form";
import divider from "../images/divider.png";
import dp from "../images/dp.png";
import leftArrow from "../images/leftarrow.png";
import credit from "../images/credit-card-alt-svgrepo-com.svg";
import editbutton from "../images/edit-pencil.svg";
import CardEdit from "../Components/CardEdit";
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import Footeropy from "../Components/Footeropy"
import "./Myprofile.css";
import { useNavigate } from "react-router-dom";


export default function Myprofile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datas, setDatas] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showediting, setShowEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data.user;
        setUserData({
          ...user,
          addresses:
            user.addresses.length > 0 ? user.addresses : [{ country: "" }],
        });
        reset({
          ...user,
          addresses:
            user.addresses.length > 0 ? user.addresses : [{ country: "" }],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [reset]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data.user;
        setDatas(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    try {
      // Log form data
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await api.patch("/user/profiling", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API response data:", response.data);
      if (response.data.success) {
        console.log("Updated user data:", response.data.user);
        setUserData(response.data.user);
        reset(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      reset(userData);
    }
    setIsEditing(!isEditing);
  };
  console.log(isEditing);

  const editForm = (card) => {
    setSelectedCard(card);
    setFormMode("edit");
    setShowEditing(true);
  };

  const addNewCard = () => {
    setSelectedCard(null);
    setFormMode("add");
    setShowEditing(true);
  };

  const handleCardUpdated = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDatas(response.data.user);
      setShowEditing(false);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };
  const goBack = () => {
    navigate("/");
  };
  if (isLoading) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <>
      <div className="main">
        <Header />
        <Navbar />
        <div className={`profilesection ${showediting ? "global-dimmed" : ""}`}>
          <div
            className="backbutton"
          >
            <img
              src={leftArrow}
              alt=""
              className="arrowback"
              onClick={goBack}
            />
            <p className="myprofile">My Profile</p>
          </div>
          <div className="mainform">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="profile-form"
             >
              <div
                className="topping"
              >
                <div className="dp">
                  <img
                    src={dp}
                    alt="dpicture"
                  />
                  <p
                    className="username" >
                    {userData.name}
                  </p>
                </div>
                <div className="buttonediting">
                  {isEditing ? (
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="save-button" >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={toggleEdit}
                      className={`edit-button ${isEditing ? "editing" : ""}`}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="mainformbody">
                <div className="form-section">
                  <div className="form-group-1">
                    <label className="form-label-profile">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      disabled={!isEditing}
                      className="form-input"
                    />
                    {errors.name && (
                      <span className="error-message">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div
                    className="form-group-1"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <label className="form-label">Gender</label>
                    <input
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      disabled={!isEditing}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group-1">
                    <label className="form-label">Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      disabled={!isEditing}
                      className="form-input"
                    />
                    {errors.email && (
                      <span className="error-message">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {userData?.addresses && userData.addresses.length > 0 ? (
                    <div
                      className="form-group-1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <label className="form-label">Country</label>
                      <input
                        {...register("addresses[0].country", {
                          required: "Country is required",
                        })}
                        disabled={!isEditing}
                        defaultValue={userData.addresses[0].country || ""} // Use only the first address's country
                        className="form-input"
                      />
                    </div>
                  ) : (
                    <div
                      className="form-group"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <label className="form-label">Country</label>
                      <input
                        {...register("addresses[0].country", {
                          required: "Country is required",
                        })}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <img src={divider} alt="" className="dividera" />
        </div>
        <div
          className="paymentMethods"
        >
          <h2 className={`payment_header ${showediting ? "dimmed" : ""}`}>Saved Payment Details</h2>
          <div
            className="maincardbody"
          >
            {datas && datas.cards && datas.cards.length > 0 ? (
              datas.cards.map((card, index) => (
                <div
                  key={index}
                  className={`carddetails ${showediting ? "dimmed" : ""}`}
                >
                  <div className="cardicon">
                    <span
                      className="plusarea">
                      <img
                        src={credit}
                        alt="credit" />
                    </span>
                  </div>
                  <div
                    className="cardnumber"
                  >
                    <div
                      className="cardno"        >
                      <p className="twelvenumber" >
                        xxxx xxxx xxxx {card.cardNumber.slice(-4)}
                      </p>
                      <p className="cardname" >
                        {card.cardHolderName}
                      </p>
                    </div>
                  </div>
                  <div className="cardedit">
                    <img
                      src={editbutton}
                      alt=""
                      onClick={() => editForm(card)}
                  
                    />
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          
            <div
              className="add-card-btn"
              onClick={addNewCard}
              style={{
                opacity: showediting ? 0.5 : 1
              }}
            >
              <p
                className="addcard"
               
              >
                <span
                  className="pluscardarea"
                  
                >

                  <span className="plus" > + </span>
                </span>{" "}
                Add new card
              </p>
            </div>
          </div>
        </div>
        {showediting && (
          <div className="editcardpopup">
            <div className="editcardarea">
             
              <CardEdit
                onClose={() => setShowEditing(false)} // Close the popup on 'onClose' event
                mode={formMode} // 'edit' or 'add' mode
                onCardUpdated={handleCardUpdated} // Callback after card is updated
                cardData={selectedCard} // Pass selected card data if editing
              />
            </div>
          </div>
        )}
      
      </div>
       
          <Footeropy />
        
    </>
  );
}
