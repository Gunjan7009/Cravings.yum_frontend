import React, { useState } from "react";
import api from "../data/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import signingimage from "../images/signing.png";
import logo2 from "../images/LOGO-2.png";
import Loader from "../Components/Loader";
import "./Userauth.css";
import Footeropy from "../Components/Footeropy";
import { setToken } from "../redux/authSLice";

const Userauth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Submitting login data:", data);
    setLoading(true);
    try {
      const response = await api.post("/signin", {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        reset();
        navigate("/");
      } else {
        alert(
          response.data.error ||
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        error.response?.data?.error ||
        "Login failed. Please check your credentials and try again."
      );
    }
    finally{
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
    {loading && <Loader />}
    <div className="fullbody">
      <div className="mainpart">
        <div className="leftside">
          <div className="welcome-section">
            <img src={logo2} alt="Logo" className="logo" />
            <h3 className="headings">Welcome Back 👋</h3>
            <p className="headings">
              Today is a new day. It's your day. You shape it.
              <br /> Sign in to start ordering.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="signinform">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="label">Email</label>
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

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
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

            <button type="submit" className="submitbutton">Sign in</button>
          </form>

          <p className="noaccount">
            Don't have an account?{" "}
            <span onClick={handleSignup} className="handlesignup">
              Sign Up
            </span>
          </p>
        </div>

        <div className="rightside">
          <img src={signingimage} alt="Sign In" className="signimage" />
        </div>
      </div>
    </div>
      <Footeropy />
    </>
  );
};

export default Userauth;
