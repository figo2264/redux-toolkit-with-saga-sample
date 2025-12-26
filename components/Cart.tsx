import { useAppDispatch, useAppSelector } from '@/store';
import {
  removeFromCartRequest,
  updateQuantityRequest,
  syncCartRequest,
  clearCart,
} from '@/store/slices/cartSlice';
import styles from '@/styles/Components.module.css';

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, loading, error, lastSyncedAt } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleRemove = (productId: string) => {
    dispatch(removeFromCartRequest(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantityRequest({ productId, quantity }));
  };

  const handleSync = () => {
    dispatch(syncCartRequest());
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isAuthenticated) {
    return (
      <div className={styles.cart}>
        <h2>Cart</h2>
        <p>Please login to view your cart</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2>Cart ({items.length} items)</h2>
        <div className={styles.cartActions}>
          <button onClick={handleSync} disabled={loading || items.length === 0}>
            {loading ? 'Syncing...' : 'Sync Cart'}
          </button>
          <button onClick={handleClear} disabled={items.length === 0}>
            Clear
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {lastSyncedAt && (
        <p className={styles.syncInfo}>
          Last synced: {new Date(lastSyncedAt).toLocaleTimeString()}
        </p>
      )}

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {items.map((item) => (
              <li key={item.product.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.product.name}</span>
                  <span className={styles.itemPrice}>
                    ${item.product.price} × {item.quantity}
                  </span>
                </div>
                <div className={styles.itemControls}>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={loading}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product.id, item.quantity + 1)
                    }
                    disabled={loading}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    disabled={loading}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}
