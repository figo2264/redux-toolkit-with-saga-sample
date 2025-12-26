import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  fork,
  take,
  cancel,
  delay,
  race,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'redux-saga';
import { productsApi, cartApi } from '@/api/mockApi';
import { AddToCartPayload, UpdateCartPayload, Product, RootState, CartItem } from '@/types';
import {
  addToCartRequest,
  addToCartSuccess,
  removeFromCartRequest,
  removeFromCartSuccess,
  updateQuantityRequest,
  updateQuantitySuccess,
  syncCartRequest,
  syncCartSuccess,
  validateCartRequest,
  validateCartSuccess,
  cartError,
} from '../slices/cartSlice';
import { loginSuccess, logoutSuccess } from '../slices/authSlice';

// Selectors
const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

// Worker Sagas
function* handleAddToCart(action: PayloadAction<AddToCartPayload>) {
  try {
    const { productId, quantity } = action.payload;

    // Check stock before adding
    const hasStock: boolean = yield call(productsApi.checkStock, productId, quantity);
    if (!hasStock) {
      yield put(cartError('Insufficient stock'));
      return;
    }

    // Fetch product details
    const product: Product = yield call(productsApi.fetchById, productId);
    yield put(addToCartSuccess({ product, quantity }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add to cart';
    yield put(cartError(message));
  }
}

function* handleRemoveFromCart(action: PayloadAction<string>) {
  try {
    yield put(removeFromCartSuccess(action.payload));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove from cart';
    yield put(cartError(message));
  }
}

function* handleUpdateQuantity(action: PayloadAction<UpdateCartPayload>) {
  try {
    const { productId, quantity } = action.payload;

    if (quantity <= 0) {
      yield put(removeFromCartSuccess(productId));
      return;
    }

    // Check stock
    const hasStock: boolean = yield call(productsApi.checkStock, productId, quantity);
    if (!hasStock) {
      yield put(cartError('Insufficient stock for requested quantity'));
      return;
    }

    yield put(updateQuantitySuccess(action.payload));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update quantity';
    yield put(cartError(message));
  }
}

function* handleSyncCart() {
  try {
    const items: CartItem[] = yield select(selectCartItems);
    const result: { success: boolean; syncedAt: number } = yield call(cartApi.syncCart, items);

    if (result.success) {
      yield put(syncCartSuccess(result.syncedAt));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to sync cart';
    yield put(cartError(message));
  }
}

function* handleValidateCart() {
  try {
    const items: CartItem[] = yield select(selectCartItems);
    const result: { valid: boolean; invalidItems: string[] } = yield call(
      cartApi.validateCart,
      items
    );

    yield put(validateCartSuccess(result.invalidItems));

    if (!result.valid) {
      yield put(cartError('Some items were removed due to availability changes'));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to validate cart';
    yield put(cartError(message));
  }
}

// Background sync saga with cancellation
function* autoSyncCart() {
  while (true) {
    yield delay(30000); // Sync every 30 seconds
    const items: CartItem[] = yield select(selectCartItems);

    if (items.length > 0) {
      // Race between sync and timeout
      const { timeout } = yield race({
        sync: call(handleSyncCart),
        timeout: delay(5000),
      });

      if (timeout) {
        console.warn('Cart sync timed out');
      }
    }
  }
}

// Auth-aware cart management
function* watchAuthForCart() {
  let syncTask: Task | null = null;

  while (true) {
    const action: PayloadAction = yield take([loginSuccess.type, logoutSuccess.type]);

    if (action.type === loginSuccess.type) {
      // Start auto-sync when user logs in
      syncTask = yield fork(autoSyncCart);
      // Validate cart on login
      yield put(validateCartRequest());
    } else if (action.type === logoutSuccess.type && syncTask) {
      // Cancel auto-sync when user logs out
      yield cancel(syncTask);
      syncTask = null;
    }
  }
}

// Watcher Saga
export function* cartSaga() {
  yield takeEvery(addToCartRequest.type, handleAddToCart);
  yield takeEvery(removeFromCartRequest.type, handleRemoveFromCart);
  yield takeLatest(updateQuantityRequest.type, handleUpdateQuantity);
  yield takeLatest(syncCartRequest.type, handleSyncCart);
  yield takeLatest(validateCartRequest.type, handleValidateCart);

  // Fork the auth watcher for cart management
  yield fork(watchAuthForCart);
}
