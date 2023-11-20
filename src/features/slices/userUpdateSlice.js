import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { USER_URL } from '../USER_URL'

export const userUpdate = createAsyncThunk(
  'update/userUpdate',
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${USER_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: userName,
        }),
      })
      const data = await response.json()
      console.log('user succesfully updated : ', data.body.userName)
      return data
    } catch (error) {
      console.log('Failed to update user')
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  status: 'void',
  error: null,
}

const userUpdateSlice = createSlice({
  name: 'update',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userUpdate.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.error = null
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
})

export default userUpdateSlice.reducer
