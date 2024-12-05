// CartShare.js - New shared component for sharing cart
import React from 'react';
import share from "../assets/shareicon.png"; // Update path if necessary

const CartShare = () => (
    <div className="sharebox">
        <div className="sharing">
            <div className="shareicon">
                <img src={share} alt="Share Icon" />
            </div>
            <div className="sharetext">
                <b>
                    Share this cart <br /> with your friends
                </b>
            </div>
        </div>
        <button className="copybtn">Copy link</button>
    </div>
);

export default CartShare;
