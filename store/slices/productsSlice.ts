import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product, FetchProductsPayload } from '@/types';

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Trigger actions (watched by sagas)
    fetchProductsRequest: (state, _action: PayloadAction<FetchProductsPayload | undefined>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    // Success actions
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    },

    // Error action
    productsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Filter actions
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Utility
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductByIdRequest,
  fetchProductsSuccess,
  fetchProductByIdSuccess,
  productsError,
  setFilters,
  clearFilters,
  clearSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
