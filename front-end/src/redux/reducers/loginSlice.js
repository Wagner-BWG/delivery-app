import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedUser: {
    name: '',
    email: '',
    userToken: '',
    role: '',
    id: '',
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

export const { setLoggedUser } = loginSlice.actions;

export default loginSlice.reducer;
