import { createSlice } from '@reduxjs/toolkit';
import { load, remove, save } from '../components/utils/storage';

const userData = load("UserData")

const initialState = {
  auth: false,
  user: userData || [],
};

const accessToken = load("AuthToken")
if (accessToken!== null) {
    initialState.auth = true;
  }

console.log(accessToken);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.user = action.payload
        console.log(action.payload.user);
        save("UserData", state.user)
        state.auth = true;
    },
    logout: (state) => {
      state.auth = false;
      remove("UserData")
      remove("AuthToken")
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;