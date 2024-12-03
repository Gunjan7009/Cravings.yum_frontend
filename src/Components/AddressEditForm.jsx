import React, { useEffect, useState } from "react";
import api from "../data/api";
import "./AddressEdit.css";

const AddressForm = ({ addressData, onClose, onAddressUpdated, mode }) => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");

  useEffect(() => {
    if (mode === "edit" && addressData) {
      setState(addressData.state);
      setCity(addressData.city);
      setZipCode(addressData.zipCode);
      setPhone(addressData.phone);
      setAddressLine(addressData.addressLine);
    }
  }, [addressData, mode]);

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = { state, city, zipCode, phone, addressLine };

      if (mode === "add") {
        await api.post("/user/addressdetails", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.put(
          "/user/addressdetails",
          { _id: addressData._id, ...data },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      onAddressUpdated();
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <>
      
        <div className="address-form-wrapper">
          <h2 className="address-form-title">
            <svg  className="locon" width="30" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0004 11.1917C11.4363 11.1917 12.6004 10.0276 12.6004 8.5917C12.6004 7.15576 11.4363 5.9917 10.0004 5.9917C8.56445 5.9917 7.40039 7.15576 7.40039 8.5917C7.40039 10.0276 8.56445 11.1917 10.0004 11.1917Z" stroke="#3F3F3F" strokeWidth="1.5" />
              <path d="M3.01675 7.07508C4.65842 -0.141583 15.3501 -0.13325 16.9834 7.08342C17.9417 11.3167 15.3084 14.9001 13.0001 17.1168C11.3251 18.7334 8.67508 18.7334 6.99175 17.1168C4.69175 14.9001 2.05842 11.3084 3.01675 7.07508Z" stroke="#3F3F3F" strokeWidth="1.5" />
            </svg>

            {mode === "add" ? "Add Address" : "Edit Address"}
          </h2>
          <div className="address-form-fields">
            <select
              className="address-form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State/UT</option>
              {/* States */}
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>

              {/* Union Territories */}
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
            <input
              className="address-form-input"
              type="text"
              placeholder="City/District"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="address-form-input"
              type="text"
              placeholder="Pin Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              className="address-form-input"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            className="address-form-textarea"
            placeholder="Enter full address"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
          />
          <button onClick={handleSaveChanges} className="address-form-button">
            Save
          </button>
        </div>

    </>
  );
};

export default AddressForm;
