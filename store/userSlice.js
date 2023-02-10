import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    editUser: (state, action) => {
      state.user = { ...state, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, editUser, logout, setLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
