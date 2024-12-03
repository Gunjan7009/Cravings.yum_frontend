import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRestaurant: "McDonald’s East London", // Default restaurant name
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
  },
});

export const { setSelectedRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
