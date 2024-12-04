import React, { useState } from "react";
import api from "../data/api";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signingimage from "../images/signing.png";
import Loader from "../Components/Loader";
import "./Userauth.css";
import logo2 from "../images/LOGO-2.png";
import Footeropy from "../Components/Footeropy";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/signup", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      console.log(response.status);
      if (response.status === 201) {
        // Handle successful login, e.g., store token, redirect, etc.
        console.log("Register successful", response.data);

        // Reset form fields
        reset();

        // Redirect to another page (e.g., dashboard)
        setTimeout(() => {
          navigate("/signin"); // Clear message after a few seconds
        }, 5000);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Optionally handle error (e.g., show an error message)
    }
    finally{
      setLoading(false);
    }
  };
  const handleSignin = () => {
    navigate("/signin");
  };
  return (
    <>
    {loading && <Loader />}
    <div className="fullbody">
      <div className="mainpart">
        <div className="leftside">
          <div className="welcome-section">
            <img src={logo2} alt="Logo" className="logo" />
            <h3 className="headings">Welcome 👋</h3>
            <p className="headings">
              Today is a new day. It's your day. You shape it.
              <br /> Sign up to start ordering.
            </p>
          </div>

          {/* Show signup error */}
          {signupError && (
            <div className="tooltip">
              <span className="tooltip-text">{signupError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="signinform">
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`input-field ${errors.name ? "input-error" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="tooltip">
                  <span className="tooltip-text">{errors.name.message}</span>
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`input-field ${errors.email ? "input-error" : ""}`}
                placeholder="Example@gmail.com"
              />
              {errors.email && (
                <div className="tooltip">
                  <span className="tooltip-text">{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div className="form-group">
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className={`input-field ${errors.phone ? "input-error" : ""}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <div className="tooltip">
                  <span className="tooltip-text">{errors.phone.message}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className={`input-field ${errors.password ? "input-error" : ""}`}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <div className="tooltip">
                  <span className="tooltip-text">{errors.password.message}</span>
                </div>
              )}
            </div>

            <button type="submit" className="submitbutton">
              Sign Up
            </button>
          </form>
          <p className="alreg">
            Already Registered?{" "}
            <span className="handlesignin" onClick={handleSignin}>
              Sign In
            </span>
          </p>
        </div>

        <div className="rightside">
          <img src={signingimage} alt="Sign Up" className="signimage" />
        </div>
      </div>
    </div>
      <Footeropy />
    </>
  );
};

export default Signup;
