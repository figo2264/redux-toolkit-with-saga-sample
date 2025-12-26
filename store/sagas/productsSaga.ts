import { call, put, takeLatest, select, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '@/api/mockApi';
import { Product, FetchProductsPayload, RootState } from '@/types';
import {
  fetchProductsRequest,
  fetchProductByIdRequest,
  fetchProductsSuccess,
  fetchProductByIdSuccess,
  productsError,
  setFilters,
} from '../slices/productsSlice';

// Selectors
const selectFilters = (state: RootState) => state.products.filters;

// Worker Sagas
function* handleFetchProducts(action: PayloadAction<FetchProductsPayload | undefined>) {
  try {
    const filters = action.payload || {};
    const products: Product[] = yield call(productsApi.fetchAll, filters);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch products';
    yield put(productsError(message));
  }
}

function* handleFetchProductById(action: PayloadAction<string>) {
  try {
    const product: Product = yield call(productsApi.fetchById, action.payload);
    yield put(fetchProductByIdSuccess(product));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch product';
    yield put(productsError(message));
  }
}

// Debounced filter change handler
function* handleFilterChange() {
  try {
    // Get current filters from state
    const filters: RootState['products']['filters'] = yield select(selectFilters);
    const products: Product[] = yield call(productsApi.fetchAll, {
      category: filters.category || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
    });
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to apply filters';
    yield put(productsError(message));
  }
}

// Watcher Saga
export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
  yield takeLatest(fetchProductByIdRequest.type, handleFetchProductById);
  // Debounce filter changes to avoid excessive API calls
  yield debounce(300, setFilters.type, handleFilterChange);
}
