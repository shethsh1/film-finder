import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("authToken", action.payload);
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = "";
      localStorage.removeItem("authToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
