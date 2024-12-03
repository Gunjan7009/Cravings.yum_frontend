import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../data/api";

// Thunks for async actions
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, { getState, dispatch }) => {
    console.log("Dispatching addItemToCart for:", item);
    const response = await api.post("/additem", { productId: item._id });
    localStorage.setItem("cartdata", JSON.stringify(response.data));
    console.log("Response from addItem API:", response.data);
    dispatch(fetchCart()); // Refresh the cart after adding an item
    return response.data;
  }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await api.get("/getcart");
  console.log("Fetched Cart Data:", response.data);
  return response.data;
});

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId, { dispatch }) => {
    await api.post("/removeitem", { productId: itemId });
    dispatch(fetchCart());
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await api.delete("/clearitem");
  return { items: [], subtotal: 0, totalToPay: 0 };
});

// Slice definition
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subtotal: 0,
    totalToPay: 0,
    status: "idle", // For loading/error states
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: "succeeded" };
      })
      .addCase(addItemToCart.pending, (state, action) => {
        const product = action.meta.arg; // Optimistically add the product
        const existingItem = state.items.find(
          (item) => item.productId._id === product._id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ productId: product, quantity: 1 });
        }
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeItemFromCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(clearCart.fulfilled, (state) => {
        return { items: [], subtotal: 0, totalToPay: 0, status: "succeeded" };
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
