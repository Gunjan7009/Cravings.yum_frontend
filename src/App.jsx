import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./redux/authSLice"; // adjust the import path
import Home from "./pages/Home";
import Myprofile from "./pages/Myprofile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddressDetails from "./pages/AddressDetails";
import Product from "./pages/Product";
import CheckOutPage from "./pages/CheckOutPage";
import PayPage from "./pages/PayPage";
import OrderSucsseful from "./pages/OrderSucsseful";
import PrivateRoute from "./Components/PrivateRoute";
import Review from "./Components/Review";
import SmallNav from "./Components/SmallNav";
import SharedCartPage from "./Components/SharedCartPage";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Myprofile />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/address" element={<AddressDetails />} />
        <Route path="/productpage/:restaurantName" element={<Product />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/payment" element={<PayPage />} />
        <Route path="/ordersuccessful" element={<OrderSucsseful />} />
        <Route path="/shared-cart/:sharedLinkId" element={<SharedCartPage />} />
      </Routes>
    </>
  );
}

export default App;
