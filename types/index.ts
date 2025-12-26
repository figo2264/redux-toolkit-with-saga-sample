// User types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  };
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  lastSyncedAt: number | null;
}

// Root state type
export interface RootState {
  auth: AuthState;
  products: ProductsState;
  cart: CartState;
}

// Action payload types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  productId: string;
  quantity: number;
}

export interface FetchProductsPayload {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
