import { useAppDispatch, useAppSelector } from '@/store';
import { logoutRequest } from '@/store/slices/authSlice';
import styles from '@/styles/Components.module.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const cartItemCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <header className={styles.header}>
      <h1>Redux Saga Store</h1>
      <div className={styles.headerRight}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.name}</span>
            <span className={styles.cartBadge}>Cart: {cartItemCount}</span>
            <button onClick={handleLogout} disabled={loading}>
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </header>
  );
}
