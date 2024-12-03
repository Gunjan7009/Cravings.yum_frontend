import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSLice";
import restaurantReducer from "./restaurantSLice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    restaurant: restaurantReducer,
  },
});

export default store;
