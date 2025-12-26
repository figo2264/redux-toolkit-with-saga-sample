import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginRequest, clearError } from '@/store/slices/authSlice';
import styles from '@/styles/Components.module.css';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>

      {error && (
        <div className={styles.error}>
          {error}
          <button type="button" onClick={handleClearError}>
            ×
          </button>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className={styles.hint}>
        Hint: Use test@example.com / password123
      </p>
    </form>
  );
}
