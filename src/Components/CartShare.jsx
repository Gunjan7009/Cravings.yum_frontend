// CartShare.js - New shared component for sharing cart
import React, { useState } from 'react';
import share from "../assets/shareicon.png"; // Update path if necessary
import api from "../data/api"; // Axios instance


const CartShare = () => {
    const [sharedLink, setSharedLink] = useState("");

    const handleShareCart = async () => {
        try {
            const response = await api.post("/share"); // Endpoint to create shared cart
            const { sharedLinkId } = response.data;
            const link = `${window.location.origin}/shared-cart/${sharedLinkId}`;
            setSharedLink(link);
            navigator.clipboard.writeText(link);
            alert("Link copied to clipboard!");
        } catch (error) {
            console.error("Error sharing cart:", error);
        }
    };

    return (
        <div className="sharebox">
            <div className="sharing">
                <div className="shareicon">
                    <img src={shareIcon} alt="Share Icon" />
                </div>
                <div className="sharetext">
                    <b>Share this cart with your friends</b>
                </div>
            </div>
            <button className="copybtn" onClick={handleShareCart}>
                Copy link
            </button>
            {/* {sharedLink && <p className="shared-link">{sharedLink}</p>} */}
        </div>
    );
};

export default CartShare;
