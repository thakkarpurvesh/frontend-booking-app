import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/bookings/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Booking created successfully!');
      return res.data;
    } catch (err) {
      const errorMessage =
              err.response?.data?.message || 'Signup failed. Try again.';
          toast.error(errorMessage); // Show error toast
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
