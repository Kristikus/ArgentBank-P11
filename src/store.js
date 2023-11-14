import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signinReducer from "./features/slices/loginSlice";
import userPostReducer from "./features/slices/userSlice";
import signupReducer from "./features/slices/signupSlice";
import userUpdate from "./features/slices/userUpdateSlice";

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  user: userPostReducer,
  signin: signinReducer,
  signup: signupReducer,
  update: userUpdate,
});

const rootReducer = (state, action) => {
  if (action.type === "signin/logout") {
    state = undefined;
  }
  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  // blacklist: 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
