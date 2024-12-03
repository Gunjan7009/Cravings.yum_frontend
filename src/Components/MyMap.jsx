import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MyMap.css"


// Fix default icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});



const MyMap = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    // Set custom location
    const customLocation = [40.7128, -74.006]; // Example: New York City (latitude, longitude)

    useEffect(() => {
        // Use Geolocation API to get the user's current position
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCurrentPosition([latitude, longitude]);
            },
            (err) => {
                console.error("Error fetching location:", err);
            }
        );
    }, []);

    return (
        <>
                <div className="main-map">
                    {/* Info Card */}
                    <div className="info-card-map">
                        <p className="headingone">
                            McDonald’s
                        </p>
                        <span className="locate" >East London</span>
                        <p className="addres">
                            Tooley St, London Bridge, London SE1 2TF,
                            <br />
                            United Kingdom
                        </p>
                        <p className="detailing"> Phone number<br /><span className="locate_2"> +934443-43 </span></p>
                        <p className="detailing"> Website<br />
                            <span className="locate_2"> http://mcdonalds.uk/</span></p>
                    </div>

                    {/* Map */}
                    <MapContainer
                        center={customLocation || currentPosition}
                        zoom={19}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        {/* Marker for user's current location */}
                        {currentPosition && (
                            <Marker position={currentPosition}>
                                <Popup>Your current location</Popup>
                            </Marker>
                        )}
                        {/* Marker for custom location */}
                        <Marker position={customLocation}>
                            <Popup>Custom Location</Popup>
                        </Marker>
                    </MapContainer>
                </div>
        
        </>
    );
};

export default MyMap;
