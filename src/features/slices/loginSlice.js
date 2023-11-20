import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { USER_URL } from '../USER_URL'

export const signInUser = createAsyncThunk(
  'signin/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(`${USER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (response.ok) {
      try {
        const data = await response.json()
        localStorage.setItem('token', JSON.stringify(data.body.token))
        return data
      } catch (error) {
        return rejectWithValue(error.message)
      }
    } else {
      const err = await response.json()
      console.log(err.message)
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  status: 'void',
  login: false,
  error: null,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
}

const signInSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.status = 'void'
      state.login = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'pending'
        state.token = null
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.login = true
        state.error = null
        state.token = JSON.parse(localStorage.getItem('token'))
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
})

export const { logout } = signInSlice.actions
export default signInSlice.reducer
