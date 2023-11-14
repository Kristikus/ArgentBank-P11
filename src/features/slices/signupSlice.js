import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../USER_URL";

export const signUpUser = createAsyncThunk(
  "signup/signUpUser",
  async ({ email, password, firstName, lastName, userName }) => {
    const response = await fetch(`${USER_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        userName,
      }),
    });
    if (response.ok) {
      try {
        const data = await response.json();
        return data;
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const err = await response.json();
      console.log(err.message);
      // return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  status: "void",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  userName: "",
  error: null,
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.email = action.payload.body.email;
        state.password = action.payload.body.password;
        state.userName = action.payload.body.userName;
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default signUpSlice.reducer;
