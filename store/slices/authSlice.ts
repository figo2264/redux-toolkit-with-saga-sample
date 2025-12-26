import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginPayload } from '@/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Trigger actions (watched by sagas)
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    checkAuthRequest: (state) => {
      state.loading = true;
    },

    // Success actions (dispatched by sagas)
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    // Error actions
    authError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Utility actions
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  logoutRequest,
  checkAuthRequest,
  loginSuccess,
  logoutSuccess,
  authError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
