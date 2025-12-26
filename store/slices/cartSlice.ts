import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product, AddToCartPayload, UpdateCartPayload } from '@/types';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  lastSyncedAt: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Trigger actions (watched by sagas)
    addToCartRequest: (state, _action: PayloadAction<AddToCartPayload>) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    updateQuantityRequest: (state, _action: PayloadAction<UpdateCartPayload>) => {
      state.loading = true;
    },
    syncCartRequest: (state) => {
      state.loading = true;
    },
    validateCartRequest: (state) => {
      state.loading = true;
    },

    // Success actions (dispatched by sagas)
    addToCartSuccess: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      state.loading = false;
    },
    removeFromCartSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.loading = false;
    },
    updateQuantitySuccess: (state, action: PayloadAction<UpdateCartPayload>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.loading = false;
    },
    syncCartSuccess: (state, action: PayloadAction<number>) => {
      state.lastSyncedAt = action.payload;
      state.loading = false;
    },
    validateCartSuccess: (state, action: PayloadAction<string[]>) => {
      // Remove invalid items
      state.items = state.items.filter(
        item => !action.payload.includes(item.product.id)
      );
      state.loading = false;
    },

    // Error action
    cartError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Utility
    clearCart: (state) => {
      state.items = [];
      state.lastSyncedAt = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToCartRequest,
  removeFromCartRequest,
  updateQuantityRequest,
  syncCartRequest,
  validateCartRequest,
  addToCartSuccess,
  removeFromCartSuccess,
  updateQuantitySuccess,
  syncCartSuccess,
  validateCartSuccess,
  cartError,
  clearCart,
  clearCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
