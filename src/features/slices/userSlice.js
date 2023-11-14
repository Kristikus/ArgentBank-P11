import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../USER_URL";

export const userPost = createAsyncThunk(
  "user/postUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${USER_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  status: "void",
  userName: "",
  firstName: "",
  lastName: "",
  // error: null,
};

const userPostSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userPost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userName = action.payload.body.userName;
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        // state.error = null;
      })
      .addCase(userPost.rejected, (state, action) => {
        state.status = "rejected";
        // state.error = action.payload;
      });
  },
});

export default userPostSlice.reducer;
