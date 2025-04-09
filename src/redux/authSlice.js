import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const signup = createAsyncThunk('auth/signup', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, formData);
    toast.success('Signup successful! Please verify your email.');
    return res.data;
  } catch (err) {
    const errorMessage =
        err.response?.data?.message || 'Signup failed. Try again.';
    toast.error(errorMessage); // Show error toast
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, formData);
    toast.success('Logged in successfully!');
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    const errorMessage =
        err.response?.data?.message || 'Login failed. Try again.';
      toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
