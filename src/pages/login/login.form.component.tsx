import React from 'react';
import styles from './login.form.style.module.scss';

const LoginForm: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1>Leverage AI Coaching</h1>
      </div>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email address</label>
          <input type="email" placeholder="Enter valid email address" />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="Enter valid email address" />
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
