import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/api/mockApi';
import { LoginPayload, User } from '@/types';
import {
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  checkAuthRequest,
  authError,
} from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';

// Worker Sagas
function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(authApi.login, email, password);
    yield put(loginSuccess(user));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    yield put(authError(message));
  }
}

function* handleLogout() {
  try {
    yield call(authApi.logout);
    yield put(logoutSuccess());
    // Side effect: clear cart on logout
    yield put(clearCart());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    yield put(authError(message));
  }
}

function* handleCheckAuth() {
  try {
    const user: User | null = yield call(authApi.getCurrentUser);
    if (user) {
      yield put(loginSuccess(user));
    } else {
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield put(logoutSuccess());
  }
}

// Watcher Saga
export function* authSaga() {
  // takeLeading prevents multiple login attempts
  yield takeLeading(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthRequest.type, handleCheckAuth);
}
