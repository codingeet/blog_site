import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios defaults
axios.defaults.withCredentials = true; // send cookies automatically
axios.defaults.baseURL = 'http://localhost:5000';

// Refresh token call
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/refresh");
      return res.data.accessToken;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Refresh failed");
    }
  }
);

// Login call
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);
      return { accessToken: res.data.accessToken };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
