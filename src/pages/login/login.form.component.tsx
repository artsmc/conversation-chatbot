// login.form.component.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.form.style.module.scss';
import authService from '../../services/auth.service';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email validation function
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      // Call the login API
      const response = await authService.login(email, password);

      // Assuming the response contains a JWT token
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('user', token);

      // Update Redux state if necessary
      // dispatch({ type: 'LOGIN_SUCCESS', payload: token });

      // Redirect to the dashboard page
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1>Leverage AI Coaching</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? <div className={styles.loader}></div> : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
