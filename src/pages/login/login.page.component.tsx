// pages/login/login.page.component.tsx
import React from 'react';
import LoginForm from './login.form.component';
import styles from './login.styles.component.module.scss';
import LoginImage from './login.image.component';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.wrapper}>
      <div className={styles.card}>
        <LoginForm />
        <LoginImage />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
