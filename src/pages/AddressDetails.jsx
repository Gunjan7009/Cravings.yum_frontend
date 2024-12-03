import React, { useEffect, useState } from "react";
import api from "../data/api";
import AddressEdit from "../Components/AddressEditForm";
import "./AddressDetails.css";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../images/leftarrow.png";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footeropy from "../Components/Footeropy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddressDetails = () => {
  const [datas, setDatas] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    // Get the data from localStorage
    const userData = localStorage.getItem("userData");

    if (userData) {
      // Parse the JSON data
      const parsedData = JSON.parse(userData);
      // Set the name from parsed data
      setName(parsedData.name);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDatas(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const editForm = (address) => {
    setSelectedAddress(address);
    setFormMode("edit");
    setShowEdit(true);
  };

  const addNewAddress = () => {
    setSelectedAddress(null);
    setFormMode("add");
    setShowEdit(true);
  };

  const handleAddressUpdated = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDatas(response.data.user);
      setShowEdit(false);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const handleRemove = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete("/user/addressdetails", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id },
      });
      console.log("Address removed.");
      handleAddressUpdated();
    } catch (error) {
      console.error("Error removing address", error);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="main">
        <Header />
        <Navbar />
        <div className="addreses">
          <div className={`addresbackbutton ${showEdit ? "dimmed" : ""}`}>
            <div className=" address-back-icon">
             <Link to="/checkout"><ArrowBackIcon /></Link>
            </div>
            <h2>Your Addresses</h2>
          </div>
          <div className={`address-body ${showEdit ? "dimmed" : ""}`}>
            <div className="add-address-btn" onClick={addNewAddress}>
              <p className="addaddress">
                <span className="plus"> + </span>
                Add Address
              </p>
            </div>
            {datas && datas.addresses && datas.addresses.length > 0 ? (
              datas.addresses.map((address, index) => (
                <div
                  key={index}
                  className={`address-item ${showEdit ? "dimmed" : ""}`}
                  style={{ position: "relative" }}
                >
                  {index === 0 && (
                    <div className="default-label" style={{}}>
                      Default
                    </div>
                  )}
                  <div
                    className="addbod"
                    style={{
                      marginLeft: "14px",
                      fontSize: "14px",
                      paddingTop: index === 0 ? "10px" : "15px",
                    }}
                  >
                    <p style={{ marginBottom: "8px" }}>{name}</p>
                    <p style={{ marginTop: "0px" }}>
                      {address.addressLine},{address.city}, {address.state},{" "}
                      {address.zipCode},{address.country}
                    </p>
                    <p>{address.phone}</p>
                  </div>
                  <div className="editingbuttons">
                    <p
                      onClick={() => editForm(address)}
                      className="address-edit-button"
                      style={{ color: "#fc8a06" }}
                    >
                      Edit
                    </p>
                    <span className="mid-line"
                    >
                      |
                    </span>
                    <p
                      onClick={() => handleRemove(address._id)}
                      className="address-delete-button"
                      style={{ color: "#fc8a06" }}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      {showEdit && (
        <div className="adresspopup">
          <div className="addresseditarea">
          <AddressEdit
          addressData={selectedAddress}
          mode={formMode}
          onClose={() => setShowEdit(false)}
          onAddressUpdated={handleAddressUpdated}
        />
          </div>
        </div>
            
      )}
      <Footeropy />
    </>
  );
};

export default AddressDetails;
