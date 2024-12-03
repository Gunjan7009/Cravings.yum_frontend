import React, { useState } from "react";
import ReviewImage from "../assets/ReviewImage.png";
import ReviewImgLine from "../assets/ReviewImgLine.png";
import WatchImg from "../assets/WtcImage.png";
import ratingImage from "../assets/ratingImage.png";
import "./Review.css";

const reviews = [
    {
        name: "John Doe",
        location: "New York",
        date: "15th November, 2023",
        rating: 5,
        text: "The ambiance was perfect, and the food was served quickly. The staff was incredibly friendly, making the experience even better.",
        profileImg: ReviewImage,
    },
    {
        name: "Jane Smith",
        location: "Los Angeles",
        date: "10th November, 2023",
        rating: 4,
        text: "A great place to dine! The desserts were especially delightful, though the main course could use some improvement.",
        profileImg: ReviewImage,
    },
    {
        name: "Alice Brown",
        location: "Chicago",
        date: "5th November, 2023",
        rating: 3,
        text: "The service was decent, but the wait time was longer than expected. The food was average, but the presentation was nice.",
        profileImg: ReviewImage,
    },
    {
        name: "Michael Green",
        location: "San Francisco",
        date: "20th November, 2023",
        rating: 4,
        text: "A lovely restaurant with great ambiance. The starters were incredible, but the drinks took a little too long to arrive.",
        profileImg: ReviewImage,
    },
    {
        name: "Emily White",
        location: "Houston",
        date: "18th November, 2023",
        rating: 5,
        text: "Exceptional service! The food tasted great, and the staff made sure we were comfortable throughout our visit.",
        profileImg: ReviewImage,
    },
    {
        name: "Daniel Black",
        location: "Seattle",
        date: "12th November, 2023",
        rating: 2,
        text: "The food was cold, and the service was slow. Not the best experience, but the desserts saved the day.",
        profileImg: ReviewImage,
    },
];

const CustomerReviews = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const isSmallScreen = window.matchMedia("(max-width: 431px)").matches;
    const reviewsPerPage = isSmallScreen ? 1 : 3;

    const paginatedReviews = reviews.slice(
        currentPage * reviewsPerPage,
        (currentPage + 1) * reviewsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () =>
        setCurrentPage((prev) =>
            prev + 1 < Math.ceil(reviews.length / reviewsPerPage) ? prev + 1 : prev
        );

    return (
        <>
            <div className="smallratingimg"> <img src={ratingImage} alt="rating image" className="smallrat-img" /></div>
            <div className="customer-reviews">
                {/* <div className="ratingimg"> <img src={ratingImage} alt="rating image" className="rat-img" /></div> */}
                
                <div className="header">
                    <h2 className="customerheading">Customer Reviews</h2>
                    <div className="navigation">
                        <button
                            className="nav-btn"
                            onClick={handlePrev}
                            aria-label="Previous Review"
                            disabled={currentPage === 0}
                        >
                            &#8249;
                        </button>
                        <button
                            className="nav-btn"
                            onClick={handleNext}
                            aria-label="Next Review"
                            disabled={currentPage + 1 >= Math.ceil(reviews.length / reviewsPerPage)}
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
                <div className="reviews-container">
                    {paginatedReviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <div className="review-header">
                                <img
                                    src={review.profileImg}
                                    alt={`${review.name}'s Profile`}
                                    className="profile-pic"
                                />
                                <img src={ReviewImgLine} className="line-img" />
                                <div className="review-info">
                                    <h4>{review.name}</h4>
                                    <p>{review.location}</p>
                                </div>
                                <span className="stars">
                                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                                </span>
                            </div>

                            <p className="review-date">
                                <img src={WatchImg} className="watch-icon" />
                                {review.date}</p>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
                <div className="navigation_2">
                    <button
                        className="nav-btn_2"
                        onClick={handlePrev}
                        aria-label="Previous Review"
                        disabled={currentPage === 0}
                    >
                        &#8249;
                    </button>
                    <button
                        className="nav-btn_2"
                        onClick={handleNext}
                        aria-label="Next Review"
                        disabled={currentPage + 1 >= Math.ceil(reviews.length / reviewsPerPage)}
                    >
                        &#8250;
                    </button>
                </div>
            </div>
            <div className="ratingimg"> <img src={ratingImage} alt="rating image" className="rat-img" /></div>

        </>
    );
};

export default CustomerReviews;
