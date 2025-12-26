import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProductsRequest, setFilters, clearFilters } from '@/store/slices/productsSlice';
import { addToCartRequest } from '@/store/slices/cartSlice';
import styles from '@/styles/Components.module.css';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items, loading, error, filters } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const cartLoading = useAppSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleCategoryChange = (category: string | null) => {
    dispatch(setFilters({ category }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleAddToCart = (productId: string) => {
    dispatch(addToCartRequest({ productId, quantity: 1 }));
  };

  const categories = ['electronics', 'home', 'office'];

  return (
    <div className={styles.productList}>
      <div className={styles.filters}>
        <button
          onClick={handleClearFilters}
          className={!filters.category ? styles.active : ''}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={filters.category === cat ? styles.active : ''}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <div className={styles.grid}>
          {items.map((product) => (
            <div key={product.id} className={styles.card}>
              <h3>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.stock}>Stock: {product.stock}</p>
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={!isAuthenticated || cartLoading}
                className={styles.addButton}
              >
                {!isAuthenticated ? 'Login to Add' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
