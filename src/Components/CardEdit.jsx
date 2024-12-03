import React, { useEffect, useState } from "react";
import api from "../data/api";
import "./CardEdit.css";

const CardEdit = ({ cardData, onClose, onCardUpdated, mode }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if (mode === "edit" && cardData) {
      // Pre-fill the form with existing card data for editing
      setCardNumber(cardData.cardNumber);
      setExpiration(cardData.expiration);
      setCvc(cardData.cvc);
      setNameOnCard(cardData.cardHolderName);
    }
  }, [cardData, mode]);

  // Button Handlers
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      // Implement your update card endpoint
      let response;

      if (mode === "add") {
        // Adding new card
        response = await api.post(
          "/user/card", // Endpoint for adding new card
          { cardNumber, expiration, cvc, cardHolderName: nameOnCard },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Editing existing card
        response = await api.put(
          "/user/card", // Update using card _id
          {
            _id: cardData._id,
            cardNumber,
            expiration,
            cvc,
            cardHolderName: nameOnCard,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log("card updated");
      onCardUpdated(); // Refresh parent component's data
      onClose();
    } catch (error) {
      console.error("Error saving changes", error);
      alert("Failed to save changes");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // const handleRemove = () => {

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete("/user/card", {
        headers: { Authorization: `Bearer ${token}` },
        data: { cardNumber: [cardData.cardNumber] },
      });
      console.log("Payment method removed.");
      onCardUpdated();
      onClose();
    } catch (error) {
      console.error("Error in removing details");
    }
  };

  // };

  return (
    <div className="editbox">
      <div className="edit-payment-container">
        <h1>
          {mode === "add" ? "Add New Payment Method" : "Edit Payment Method"}
        </h1>
        <form>
          <label className="cardlabel">
            <span>Card Number</span>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="**** **** **** ****"
            />
          </label>

          <label className="cardlabel">
            <span>Expiration</span>
            <input
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="MMYY"
            />
          </label>

          <label className="cardlabel">
            <span>CVC</span>
            <input
              type="number"
              value={cvc}
              max="999"
              onChange={(e) => setCvc(e.target.value.slice(0, 3))}
              placeholder="XXX"
            />
          </label>

          <label className="cardlabel">
            <span>Name on Card</span>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
          </label>

          <div className="button-group">
            <div className="leftsidebuttons">
              {mode === "edit" && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="rightsidebuttons">
              <button
                type="button"
                className="card-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="card-save-button"
                onClick={handleSaveChanges}
              >
                {mode === "add" ? "Add Card" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEdit;
