import { User, Product, CartItem } from '@/types';

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockUsers: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: 'password123',
    user: { id: '1', email: 'test@example.com', name: 'Test User' }
  }
};

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop', price: 999, description: 'High-performance laptop', category: 'electronics', stock: 10 },
  { id: '2', name: 'Headphones', price: 199, description: 'Wireless headphones', category: 'electronics', stock: 25 },
  { id: '3', name: 'Coffee Mug', price: 15, description: 'Ceramic coffee mug', category: 'home', stock: 100 },
  { id: '4', name: 'Desk Lamp', price: 45, description: 'LED desk lamp', category: 'home', stock: 30 },
  { id: '5', name: 'Notebook', price: 8, description: 'Lined notebook', category: 'office', stock: 200 },
  { id: '6', name: 'Keyboard', price: 150, description: 'Mechanical keyboard', category: 'electronics', stock: 15 },
];

// Mock API functions
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);

    const record = mockUsers[email];
    if (!record || record.password !== password) {
      throw new Error('Invalid credentials');
    }

    return record.user;
  },

  logout: async (): Promise<void> => {
    await delay(500);
  },

  getCurrentUser: async (): Promise<User | null> => {
    await delay(800);
    // Simulate checking session - for demo, return null
    return null;
  }
};

export const productsApi = {
  fetchAll: async (filters?: { category?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> => {
    await delay(800);

    let products = [...mockProducts];

    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters?.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }

    return products;
  },

  fetchById: async (id: string): Promise<Product> => {
    await delay(500);

    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },

  checkStock: async (productId: string, quantity: number): Promise<boolean> => {
    await delay(300);

    const product = mockProducts.find(p => p.id === productId);
    return product ? product.stock >= quantity : false;
  }
};

export const cartApi = {
  syncCart: async (items: CartItem[]): Promise<{ success: boolean; syncedAt: number }> => {
    await delay(600);

    // Simulate occasional sync failures for testing error handling
    if (Math.random() < 0.1) {
      throw new Error('Cart sync failed. Please try again.');
    }

    return { success: true, syncedAt: Date.now() };
  },

  validateCart: async (items: CartItem[]): Promise<{ valid: boolean; invalidItems: string[] }> => {
    await delay(400);

    const invalidItems: string[] = [];

    for (const item of items) {
      const product = mockProducts.find(p => p.id === item.product.id);
      if (!product || product.stock < item.quantity) {
        invalidItems.push(item.product.id);
      }
    }

    return { valid: invalidItems.length === 0, invalidItems };
  }
};
