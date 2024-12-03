import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const initialState = {
    token: null,
    userId:null,
    name:null,
    isAuthenticated:false,
}

const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state,action) =>{
            state.token = action.payload;
            try {
                const decoded = jwtDecode(action.payload);
                state.userId =decoded.id;
                state.name = decoded.name;
                state.isAuthenticated =true;
                 localStorage.setItem("token", action.payload);
            } catch (error) {
                console.error("Failed to decode JWT token:", error);
                state.userId=null;
                state.isAuthenticated=false;
                 localStorage.removeItem("token");
            }
        },
        logout: (state)=>{
            state.token=null;
            state.userId=null;
            state.isAuthenticated = false;
             localStorage.removeItem("token");
        }
    },
});

export const {setToken, logout} = authSLice.actions;
export default authSLice.reducer;