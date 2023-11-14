import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../USER_URL";

export const signInUser = createAsyncThunk(
  "signin/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(`${USER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      try {
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data.body.token));
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      const err = await response.json();
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// //Slice
const initialState = {
  status: "void",
  login: false,
  error: null,
};

const signInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.status = "void";
      state.login = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.status = "fulfilled";
        state.login = "true";
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
