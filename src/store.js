import { configureStore, combineReducers } from '@reduxjs/toolkit'
import signinReducer from './features/slices/loginSlice'
import userPostReducer from './features/slices/userSlice'
import signupReducer from './features/slices/signupSlice'
import userUpdate from './features/slices/userUpdateSlice'

const rootReducer = (state, action) => {
  if (action.type === 'signin/logout') {
    state = undefined
  }
  return reducers(state, action)
}

const reducers = combineReducers({
  signin: signinReducer,
  user: userPostReducer,
  signup: signupReducer,
  update: userUpdate,
})

export const store = configureStore({
  reducer: rootReducer,
})
